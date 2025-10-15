from __future__ import annotations

import time
from datetime import datetime
from pathlib import Path
from typing import List

import pandas as pd
import streamlit as st

from src import data_loader
from src.quiz_engine import QuizQuestion, build_quiz
from src.storage import QuizResult, fetch_best_score, fetch_recent_results, save_result
from src.ui_components import (
    apply_custom_css,
    render_feedback,
    render_home_page,
    render_next_button,
    render_quiz_page,
    render_results_page,
)
from src.utils import difficulty_options

BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
CACHE_PATH = BASE_DIR / "cache" / "car_metadata.json"
DB_PATH = BASE_DIR / "data" / "results.db"
ASSETS_CSS = BASE_DIR / "assets" / "styles.css"

MIN_QUESTIONS = 5
MAX_QUESTIONS = 10
DEFAULT_QUESTIONS = 5


def init_session_state() -> None:
    defaults = {
        "page": "home",
        "questions": [],
        "current_index": 0,
        "score": 0,
        "history": [],
        "awaiting_next": False,
        "last_feedback": None,
        "start_time": None,
        "result_saved": False,
        "settings": {},
    }

    for key, value in defaults.items():
        if key not in st.session_state:
            st.session_state[key] = value


@st.cache_data(show_spinner=False)
def load_dataframe(rebuild_cache: bool = False) -> pd.DataFrame:
    return data_loader.load_metadata(DATA_DIR, CACHE_PATH, rebuild_cache=rebuild_cache)


def start_quiz(df: pd.DataFrame, difficulty: str, num_questions: int) -> None:
    questions: List[QuizQuestion] = build_quiz(
        df=df,
        num_questions=num_questions,
        difficulty=difficulty,
        num_options=10,
        seed=int(time.time()),
    )

    st.session_state["questions"] = questions
    st.session_state["current_index"] = 0
    st.session_state["score"] = 0
    st.session_state["history"] = []
    st.session_state["awaiting_next"] = False
    st.session_state["last_feedback"] = None
    st.session_state["start_time"] = time.time()
    st.session_state["result_saved"] = False
    st.session_state["settings"] = {
        "difficulty": difficulty,
        "num_questions": num_questions,
    }
    st.session_state["page"] = "quiz"


def handle_submission(selected_option: str, question: QuizQuestion) -> None:
    is_correct = question.options[question.correct_index] == selected_option
    if is_correct:
        st.session_state["score"] += 1

    st.session_state["history"].append(
        {
            "metadata": question.metadata,
            "selected_option": selected_option,
            "correct_option": question.options[question.correct_index],
            "is_correct": is_correct,
        }
    )
    st.session_state["awaiting_next"] = True
    st.session_state["last_feedback"] = {
        "is_correct": is_correct,
        "correct_option": question.options[question.correct_index],
    }


def go_to_next_question() -> None:
    st.session_state["current_index"] += 1
    st.session_state["awaiting_next"] = False
    st.session_state["last_feedback"] = None


def finalize_results() -> None:
    if st.session_state["result_saved"]:
        return

    duration = None
    if st.session_state["start_time"]:
        duration = int(time.time() - st.session_state["start_time"])

    result = QuizResult(
        played_at=datetime.utcnow(),
        num_questions=len(st.session_state["questions"]),
        difficulty=st.session_state["settings"].get("difficulty", "unknown"),
        correct_count=st.session_state["score"],
        duration_seconds=duration,
    )
    save_result(DB_PATH, result)
    st.session_state["result_saved"] = True


def reset_to_home() -> None:
    for key in ["page", "questions", "current_index", "score", "history",
                "awaiting_next", "last_feedback", "start_time", "result_saved",
                "settings"]:
        if key in st.session_state:
            del st.session_state[key]
    init_session_state()


def home_page(df: pd.DataFrame) -> None:
    difficulties = difficulty_options()
    start_quiz_button, difficulty, num_questions = render_home_page(
        difficulties=difficulties,
        default_questions=DEFAULT_QUESTIONS,
        min_questions=MIN_QUESTIONS,
        max_questions=MAX_QUESTIONS,
    )

    if start_quiz_button:
        try:
            start_quiz(df, difficulty, num_questions)
            st.experimental_rerun()
        except ValueError as exc:
            st.error(str(exc))


def quiz_page() -> None:
    questions: List[QuizQuestion] = st.session_state["questions"]
    current_index: int = st.session_state["current_index"]
    current_score: int = st.session_state["score"]

    if not questions:
        st.warning("퀴즈를 시작하기 위해 홈으로 돌아갑니다.")
        reset_to_home()
        st.experimental_rerun()
        return

    if current_index >= len(questions):
        st.session_state["page"] = "results"
        st.experimental_rerun()
        return

    question = questions[current_index]
    selected_option, submitted = render_quiz_page(
        question=question,
        current_index=current_index,
        total_questions=len(questions),
        current_score=current_score,
    )

    if submitted and selected_option is not None and not st.session_state["awaiting_next"]:
        handle_submission(selected_option, question)

    if st.session_state["last_feedback"]:
        render_feedback(
            st.session_state["last_feedback"]["is_correct"],
            st.session_state["last_feedback"]["correct_option"],
        )
        is_last = current_index == len(questions) - 1
        if render_next_button(is_last):
            if is_last:
                st.session_state["page"] = "results"
                st.experimental_rerun()
            else:
                # 선택된 옵션 상태 초기화
                option_key = f"option_{current_index}"
                if option_key in st.session_state:
                    del st.session_state[option_key]
                go_to_next_question()
                st.experimental_rerun()


def results_page() -> None:
    finalize_results()
    score = st.session_state["score"]
    total_questions = len(st.session_state["questions"])
    history = st.session_state["history"]
    recent_results = fetch_recent_results(DB_PATH, limit=10)
    best_result = fetch_best_score(DB_PATH)

    render_results_page(
        score=score,
        total_questions=total_questions,
        history=history,
        recent_results=recent_results,
        best_result=best_result,
    )


def main() -> None:
    st.set_page_config(page_title="Car Picker Quiz", layout="wide")
    apply_custom_css(str(ASSETS_CSS))

    init_session_state()

    rebuild_cache = st.sidebar.checkbox("메타데이터 새로고침", value=False)

    try:
        df = load_dataframe(rebuild_cache=rebuild_cache)
    except Exception as exc:
        st.error(f"메타데이터를 불러오는 데 실패했습니다: {exc}")
        if st.button("홈으로 돌아가기"):
            reset_to_home()
            st.experimental_rerun()
        return

    st.sidebar.subheader("데이터 요약")
    st.sidebar.write(f"총 이미지 수: {len(df)}")
    st.sidebar.write(f"제조사 수: {df['make'].nunique()}")
    st.sidebar.write(f"모델 수: {df['model'].nunique()}")

    page = st.session_state["page"]

    if page == "home":
        home_page(df)
    elif page == "quiz":
        quiz_page()
    elif page == "results":
        results_page()
    else:
        reset_to_home()
        st.experimental_rerun()


if __name__ == "__main__":
    main()
