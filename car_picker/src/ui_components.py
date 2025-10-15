from __future__ import annotations

from datetime import datetime
from typing import Iterable, List, Optional, Tuple

import pandas as pd
import streamlit as st

from .quiz_engine import QuizQuestion
from .utils import Difficulty, difficulty_options, format_label


def apply_custom_css(css_path: Optional[str]) -> None:
    if not css_path:
        return
    try:
        with open(css_path, "r", encoding="utf-8") as fp:
            st.markdown(f"<style>{fp.read()}</style>", unsafe_allow_html=True)
    except FileNotFoundError:
        st.warning("커스텀 스타일 파일을 찾을 수 없습니다.")


def render_home_page(
    difficulties: Iterable[Difficulty],
    default_questions: int,
    min_questions: int,
    max_questions: int,
) -> Tuple[bool, str, int]:
    st.title("🚗 자동차 이미지 퀴즈")
    st.caption("제조사, 모델, 연식을 맞혀보세요!")

    difficulty_map = {difficulty.label: difficulty.key for difficulty in difficulties}
    default_option = next(iter(difficulty_map)) if difficulty_map else "쉬움"

    selected_label = st.selectbox(
        "난이도를 선택하세요",
        options=list(difficulty_map.keys()),
        format_func=lambda label: f"{label}",
        index=list(difficulty_map.keys()).index(default_option),
        help="쉬움: 제조사 / 보통: 제조사+모델 / 어려움: 제조사+모델+연식",
    )

    num_questions = st.slider(
        "문제 수를 선택하세요",
        min_value=min_questions,
        max_value=max_questions,
        value=default_questions,
        step=1,
    )

    start_quiz = st.button("퀴즈 시작", type="primary")

    return start_quiz, difficulty_map[selected_label], num_questions


def render_quiz_page(
    question: QuizQuestion,
    current_index: int,
    total_questions: int,
    current_score: int,
) -> Tuple[Optional[str], bool]:
    st.subheader(f"문제 {current_index + 1} / {total_questions}")
    st.write(f"현재 점수: **{current_score}점**")

    st.image(question.image_path, use_column_width=True)

    with st.form(key=f"quiz_form_{current_index}"):
        selected_option = st.radio(
            "정답을 선택하세요",
            options=question.options,
            key=f"option_{current_index}",
        )
        submitted = st.form_submit_button("정답 제출")

    return selected_option if submitted else None, submitted


def render_feedback(is_correct: bool, correct_option: str) -> None:
    if is_correct:
        st.success("정답입니다! 🎉")
    else:
        st.error(f"오답입니다. 정답은 **{correct_option}** 입니다.")


def render_next_button(is_last_question: bool) -> bool:
    if is_last_question:
        return st.button("결과 보기", type="primary")
    return st.button("다음 문제", type="primary")


def render_results_page(
    score: int,
    total_questions: int,
    history: List[dict],
    recent_results: List[dict],
    best_result: Optional[dict],
) -> None:
    st.header("결과")
    accuracy = (score / total_questions) * 100 if total_questions else 0
    st.metric("최종 점수", f"{score} / {total_questions}", f"{accuracy:.1f}% 정확도")

    if history:
        st.subheader("문제별 결과")
        result_rows = []
        for idx, item in enumerate(history, start=1):
            metadata = item["metadata"]
            result_rows.append(
                {
                    "문제": idx,
                    "제조사": metadata.get("make"),
                    "모델": metadata.get("model"),
                    "연식": metadata.get("year"),
                    "선택한 답": item["selected_option"],
                    "정답": item["correct_option"],
                    "정답 여부": "O" if item["is_correct"] else "X",
                }
            )

        result_df = pd.DataFrame(result_rows)
        st.dataframe(result_df, hide_index=True, use_container_width=True)

        csv = result_df.to_csv(index=False).encode("utf-8-sig")
        st.download_button(
            "결과 CSV 다운로드",
            data=csv,
            file_name=f"quiz_results_{datetime.now():%Y%m%d_%H%M%S}.csv",
            mime="text/csv",
        )

    if recent_results:
        st.subheader("최근 플레이 기록")
        recent_df = pd.DataFrame(recent_results)
        recent_df["played_at"] = pd.to_datetime(recent_df["played_at"]).dt.tz_localize(
            None
        )
        st.dataframe(recent_df, hide_index=True, use_container_width=True)

    if best_result:
        st.subheader("최고 기록")
        best_accuracy = best_result.get("accuracy", 0) * 100
        st.write(
            f"{best_result['played_at']} - "
            f"{best_result['correct_count']} / {best_result['num_questions']} "
            f"({best_accuracy:.1f}% 정확도, 난이도: {best_result['difficulty']})"
        )

    if st.button("다시 시작하기", type="primary"):
        st.experimental_rerun()
