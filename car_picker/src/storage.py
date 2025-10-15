from __future__ import annotations

import sqlite3
from dataclasses import dataclass, asdict
from datetime import datetime
from pathlib import Path
from typing import List, Optional


@dataclass
class QuizResult:
    played_at: datetime
    num_questions: int
    difficulty: str
    correct_count: int
    duration_seconds: Optional[int]

    @property
    def accuracy(self) -> float:
        if self.num_questions == 0:
            return 0.0
        return round(self.correct_count / self.num_questions, 4)


def init_db(db_path: Path) -> None:
    db_path.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(db_path) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS quiz_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                played_at TEXT NOT NULL,
                num_questions INTEGER NOT NULL,
                difficulty TEXT NOT NULL,
                correct_count INTEGER NOT NULL,
                duration_seconds INTEGER,
                accuracy REAL NOT NULL
            )
            """
        )
        conn.commit()


def save_result(db_path: Path, result: QuizResult) -> None:
    init_db(db_path)
    with sqlite3.connect(db_path) as conn:
        conn.execute(
            """
            INSERT INTO quiz_results (
                played_at,
                num_questions,
                difficulty,
                correct_count,
                duration_seconds,
                accuracy
            ) VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                result.played_at.isoformat(),
                result.num_questions,
                result.difficulty,
                result.correct_count,
                result.duration_seconds,
                result.accuracy,
            ),
        )
        conn.commit()


def fetch_recent_results(db_path: Path, limit: int = 10) -> List[dict]:
    if not db_path.exists():
        return []

    with sqlite3.connect(db_path) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.execute(
            """
            SELECT played_at, num_questions, difficulty, correct_count,
                   duration_seconds, accuracy
            FROM quiz_results
            ORDER BY played_at DESC
            LIMIT ?
            """,
            (limit,),
        )
        rows = cursor.fetchall()

    return [dict(row) for row in rows]


def fetch_best_score(db_path: Path) -> Optional[dict]:
    if not db_path.exists():
        return None

    with sqlite3.connect(db_path) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.execute(
            """
            SELECT played_at, num_questions, difficulty, correct_count,
                   duration_seconds, accuracy
            FROM quiz_results
            ORDER BY accuracy DESC, correct_count DESC, played_at DESC
            LIMIT 1
            """
        )
        row = cursor.fetchone()

    return dict(row) if row else None
