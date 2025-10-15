from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List

import pandas as pd


@dataclass(frozen=True)
class Difficulty:
    key: str
    label: str
    fields: List[str]
    description: str


DIFFICULTY_CONFIG: Dict[str, Difficulty] = {
    "easy": Difficulty(
        key="easy",
        label="쉬움",
        fields=["make"],
        description="제조사만 맞추기",
    ),
    "normal": Difficulty(
        key="normal",
        label="보통",
        fields=["make", "model"],
        description="제조사와 모델 맞추기",
    ),
    "hard": Difficulty(
        key="hard",
        label="어려움",
        fields=["make", "model", "year"],
        description="제조사·모델·연식 모두 맞추기",
    ),
}


def format_label(row: pd.Series, difficulty_key: str) -> str:
    difficulty = DIFFICULTY_CONFIG.get(difficulty_key)
    if difficulty is None:
        raise ValueError(f"지원하지 않는 난이도입니다: {difficulty_key}")

    parts: List[str] = []
    for field in difficulty.fields:
        value = row.get(field)
        if pd.isna(value) or value is None:
            continue
        parts.append(str(value))

    if not parts:
        # 필드 데이터가 없을 경우 대체 문자열 사용
        return str(row.get("label_display", "알 수 없음")).strip()

    return " ".join(parts)


def difficulty_options() -> List[Difficulty]:
    return list(DIFFICULTY_CONFIG.values())
