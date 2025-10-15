from __future__ import annotations

import json
import re
import uuid
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional

import pandas as pd

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}
DRIVETRAIN_TOKENS = {"FWD", "RWD", "AWD", "4WD", "4X4", "4x4", "2WD"}


@dataclass(frozen=True)
class CarImageMetadata:
    """파싱된 차량 이미지 메타데이터 레코드."""

    record_id: str
    image_path: str
    make: str
    model: str
    year: Optional[int]
    drivetrain: Optional[str]
    doors: Optional[str]
    trim: Optional[str]
    extra_tokens: List[str]

    @property
    def label_display(self) -> str:
        if self.year:
            return f"{self.make} {self.model} {self.year}"
        return f"{self.make} {self.model}"

    def to_dict(self) -> Dict[str, object]:
        return {
            "id": self.record_id,
            "image_path": self.image_path,
            "make": self.make,
            "model": self.model,
            "year": self.year,
            "drivetrain": self.drivetrain,
            "doors": self.doors,
            "trim": self.trim,
            "extra_tokens": self.extra_tokens,
            "label_display": self.label_display,
        }


def _parse_extra_tokens(tokens: Iterable[str]) -> Dict[str, Optional[str]]:
    drivetrain = None
    doors = None
    trim_parts: List[str] = []
    extra: List[str] = []

    door_pattern = re.compile(r"(?P<count>\d+)\s*dr", re.IGNORECASE)

    for token in tokens:
        normalized = token.upper()
        if normalized in DRIVETRAIN_TOKENS and drivetrain is None:
            drivetrain = normalized
            continue

        door_match = door_pattern.fullmatch(token)
        if door_match and doors is None:
            doors = door_match.group("count")
            continue

        if token.isalpha() and len(token) <= 3:
            trim_parts.append(token)
        else:
            extra.append(token)

    trim = "-".join(trim_parts) if trim_parts else None

    return {
        "drivetrain": drivetrain,
        "doors": doors,
        "trim": trim,
        "extra_tokens": extra,
    }


def parse_filename(image_path: Path) -> Optional[CarImageMetadata]:
    """이미지 파일명에서 메타데이터를 추출한다."""
    stem = image_path.stem
    tokens = [token for token in stem.split("_") if token]
    if len(tokens) < 3:
        return None

    make = tokens[0]
    model = tokens[1]

    year: Optional[int]
    try:
        year = int(tokens[2])
    except ValueError:
        year = None

    extra_info = _parse_extra_tokens(tokens[3:])

    record_id = uuid.uuid5(uuid.NAMESPACE_URL, str(image_path.resolve())).hex

    return CarImageMetadata(
        record_id=record_id,
        image_path=str(image_path),
        make=make,
        model=model,
        year=year,
        drivetrain=extra_info["drivetrain"],
        doors=extra_info["doors"],
        trim=extra_info["trim"],
        extra_tokens=extra_info["extra_tokens"],
    )


def _iter_image_files(data_dir: Path) -> Iterable[Path]:
    for path in data_dir.rglob("*"):
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS:
            yield path


def build_dataframe(data_dir: Path) -> pd.DataFrame:
    """데이터 디렉터리에서 DataFrame을 생성한다."""
    if not data_dir.exists():
        raise FileNotFoundError(f"데이터 디렉터리가 존재하지 않습니다: {data_dir}")

    records: List[Dict[str, object]] = []
    for image_path in _iter_image_files(data_dir):
        metadata = parse_filename(image_path)
        if metadata is None:
            continue
        records.append(metadata.to_dict())

    if not records:
        raise ValueError("유효한 이미지 메타데이터를 찾지 못했습니다.")

    df = pd.DataFrame.from_records(records)
    df["year"] = pd.to_numeric(df["year"], errors="coerce").astype("Int64")
    return df


def load_metadata(
    data_dir: Path,
    cache_path: Path,
    rebuild_cache: bool = False,
) -> pd.DataFrame:
    """캐시를 활용하여 메타데이터 DataFrame을 로드한다."""
    if cache_path.exists() and not rebuild_cache:
        with cache_path.open("r", encoding="utf-8") as fp:
            content = json.load(fp)
        df = pd.DataFrame(content)
        df["year"] = pd.to_numeric(df.get("year"), errors="coerce").astype("Int64")
        return df

    df = build_dataframe(data_dir)
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    with cache_path.open("w", encoding="utf-8") as fp:
        json.dump(df.to_dict(orient="records"), fp, ensure_ascii=False, indent=2)
    return df
