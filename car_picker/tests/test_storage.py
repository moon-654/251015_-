from datetime import datetime
from pathlib import Path

from src.storage import QuizResult, fetch_recent_results, save_result


def test_save_and_fetch_results(tmp_path):
    db_path = tmp_path / "results.db"

    result = QuizResult(
        played_at=datetime(2025, 1, 1, 12, 0, 0),
        num_questions=5,
        difficulty="hard",
        correct_count=4,
        duration_seconds=120,
    )

    save_result(db_path, result)

    rows = fetch_recent_results(db_path, limit=5)

    assert len(rows) == 1
    stored = rows[0]
    assert stored["num_questions"] == 5
    assert stored["difficulty"] == "hard"
    assert stored["correct_count"] == 4
