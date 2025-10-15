from __future__ import annotations

import random
from dataclasses import dataclass
from typing import Dict, List, Optional

import pandas as pd

from .utils import DIFFICULTY_CONFIG, format_label


@dataclass
class QuizQuestion:
    """퀴즈 문제 데이터 구조."""

    image_path: str
    options: List[str]
    correct_index: int
    metadata: Dict[str, Optional[str]]


def _dedupe_preserve(items: List[str]) -> List[str]:
    seen = set()
    unique: List[str] = []
    for item in items:
        if item in seen:
            continue
        seen.add(item)
        unique.append(item)
    return unique


def _candidate_labels(
    df: pd.DataFrame, base_row: pd.Series, difficulty: str
) -> List[str]:
    base_index = base_row.name
    pool = df.drop(index=base_index)

    candidates: List[str] = []
    if "make" in base_row and pd.notna(base_row["make"]):
        same_make = pool[pool["make"] == base_row["make"]]
        candidates.extend(
            same_make.apply(lambda row: format_label(row, difficulty), axis=1).tolist()
        )

    if "model" in base_row and pd.notna(base_row["model"]):
        same_model = pool[
            (pool["make"] == base_row["make"]) & (pool["model"] == base_row["model"])
        ]
        candidates.extend(
            same_model.apply(lambda row: format_label(row, difficulty), axis=1).tolist()
        )

    candidates.extend(
        pool.apply(lambda row: format_label(row, difficulty), axis=1).tolist()
    )

    return _dedupe_preserve([c for c in candidates if c])


def build_question(
    df: pd.DataFrame,
    base_row: pd.Series,
    difficulty: str,
    num_options: int,
    rng: random.Random,
) -> QuizQuestion:
    correct_label = format_label(base_row, difficulty)
    candidates = _candidate_labels(df, base_row, difficulty)

    if correct_label not in candidates:
        candidates.insert(0, correct_label)

    candidates = _dedupe_preserve(candidates)
    candidates = [c for c in candidates if c != correct_label]

    if len(candidates) < num_options - 1:
        # 후보가 부족할 경우 전체 데이터에서 보충
        all_labels = df.apply(lambda row: format_label(row, difficulty), axis=1).tolist()
        extra = [label for label in all_labels if label != correct_label]
        extra = _dedupe_preserve(extra)
        for label in extra:
            if label not in candidates:
                candidates.append(label)
            if len(candidates) >= num_options - 1:
                break

    rng.shuffle(candidates)
    options = [correct_label] + candidates[: max(0, num_options - 1)]
    rng.shuffle(options)

    try:
        correct_index = options.index(correct_label)
    except ValueError as exc:
        raise RuntimeError("정답 옵션을 찾을 수 없습니다.") from exc

    metadata = {
        "make": base_row.get("make"),
        "model": base_row.get("model"),
        "year": base_row.get("year"),
        "label_display": base_row.get("label_display"),
        "image_path": base_row.get("image_path"),
    }

    return QuizQuestion(
        image_path=base_row["image_path"],
        options=options,
        correct_index=correct_index,
        metadata=metadata,
    )


def build_quiz(
    df: pd.DataFrame,
    num_questions: int,
    difficulty: str,
    num_options: int = 10,
    seed: Optional[int] = None,
) -> List[QuizQuestion]:
    if difficulty not in DIFFICULTY_CONFIG:
        raise ValueError(f"지원하지 않는 난이도입니다: {difficulty}")

    if df.empty:
        raise ValueError("메타데이터가 비어 있어 퀴즈를 생성할 수 없습니다.")

    if num_questions < 1:
        raise ValueError("문제 수는 1 이상이어야 합니다.")

    num_questions = min(num_questions, len(df))
    rng = random.Random(seed)

    sampled = df.sample(frac=1, random_state=seed).head(num_questions).reset_index(
        drop=False
    )

    questions: List[QuizQuestion] = []
    for _, row in sampled.iterrows():
        question = build_question(df, row, difficulty, num_options, rng)
        questions.append(question)

    return questions
