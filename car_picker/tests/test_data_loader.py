from pathlib import Path

import pandas as pd

from src import data_loader


def test_parse_filename_extracts_core_fields(tmp_path):
    image_path = tmp_path / "Acura_ILX_2013_28_16_110_15_4_70_55_179_39_FWD_5_4_4dr_aWg.jpg"
    image_path.write_bytes(b"fakeimage")

    metadata = data_loader.parse_filename(image_path)

    assert metadata is not None
    assert metadata.make == "Acura"
    assert metadata.model == "ILX"
    assert metadata.year == 2013
    assert metadata.drivetrain == "FWD"
    assert metadata.doors == "4"


def test_build_dataframe_collects_records(tmp_path):
    filenames = [
        "Acura_ILX_2013_foo_FWD_4dr_id.jpg",
        "Audi_A4_2018_bar_AWD_4dr_id.jpg",
    ]
    data_dir = tmp_path / "data"
    data_dir.mkdir()

    for name in filenames:
        (data_dir / name).write_bytes(b"")

    df = data_loader.build_dataframe(data_dir)

    assert len(df) == 2
    assert set(df.columns) >= {
        "id",
        "image_path",
        "make",
        "model",
        "year",
        "label_display",
    }
    assert df["make"].tolist() == ["Acura", "Audi"]
    assert pd.api.types.is_integer_dtype(df["year"])
