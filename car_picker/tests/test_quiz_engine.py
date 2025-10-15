import pandas as pd

from src.quiz_engine import build_quiz
from src.utils import format_label


def _sample_dataframe() -> pd.DataFrame:
    data = [
        {
            "id": "1",
            "image_path": "image1.jpg",
            "make": "Acura",
            "model": "ILX",
            "year": 2013,
            "label_display": "Acura ILX 2013",
        },
        {
            "id": "2",
            "image_path": "image2.jpg",
            "make": "Audi",
            "model": "A4",
            "year": 2018,
            "label_display": "Audi A4 2018",
        },
        {
            "id": "3",
            "image_path": "image3.jpg",
            "make": "BMW",
            "model": "320i",
            "year": 2019,
            "label_display": "BMW 320i 2019",
        },
    ]
    return pd.DataFrame(data)


def test_build_quiz_generates_requested_number_of_questions():
    df = _sample_dataframe()
    questions = build_quiz(df, num_questions=2, difficulty="normal", seed=42)

    assert len(questions) == 2
    assert all(len(q.options) >= 3 for q in questions)

    for question in questions:
        correct_label = format_label(
            df[df["image_path"] == question.image_path].iloc[0], "normal"
        )
        assert question.options.count(correct_label) == 1
