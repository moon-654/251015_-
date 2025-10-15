# 자동차 이미지 퀴즈 앱

`car_picker/data` 폴더에 저장된 차량 이미지와 파일명을 기반으로 제조사·모델·연식을 맞히는 퀴즈 앱입니다. Streamlit으로 작성되어 브라우저에서 간편하게 실행할 수 있습니다.

## 주요 기능
- 난이도(쉬움/보통/어려움) 선택 및 문제 수(5~10문항) 설정
- 문제당 10개의 보기(정답 1 + 오답 9) 자동 생성
- 즉시 정오답 피드백과 진행 상황 표시
- 플레이 기록을 SQLite DB에 저장하고 최근/최고 기록 조회
- 결과 CSV 다운로드 지원

## 폴더 구조
```
car_picker/
├── app.py                # Streamlit 엔트리 포인트
├── assets/               # 커스텀 스타일
├── cache/                # 메타데이터 캐시(JSON)
├── data/                 # 차량 이미지 및 결과 DB(results.db)
├── requirements.txt
├── requirements-dev.txt
├── src/
│   ├── data_loader.py    # 이미지 메타데이터 파싱 & 캐싱
│   ├── quiz_engine.py    # 문제 생성 로직
│   ├── storage.py        # SQLite 저장/조회
│   ├── ui_components.py  # UI 헬퍼 컴포넌트
│   └── utils.py          # 난이도 설정 등 공용 함수
└── tests/                # 단위 테스트
```

## 사전 준비
- Python 3.9 이상
- 차량 이미지가 `car_picker/data` 경로에 존재해야 합니다.

## 설치 및 실행
1. 가상 환경 생성(선택 사항):
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\activate
   ```
2. 의존성 설치:
   ```powershell
   pip install -r requirements.txt
   ```
3. 앱 실행:
   ```powershell
   streamlit run app.py
   ```
4. 브라우저에서 `http://localhost:8501` 접속 후 퀴즈를 시작합니다.

## 옵션
- 사이드바의 “메타데이터 새로고침” 체크박스를 선택하면 캐시를 무시하고 메타데이터를 다시 파싱합니다.
- 결과 페이지에서 CSV 다운로드 버튼을 통해 세션 기록을 저장할 수 있습니다.

## 테스트 실행
단위 테스트를 실행하려면 개발용 의존성을 설치한 뒤 `pytest` 명령을 사용합니다.
```powershell
pip install -r requirements-dev.txt
pytest
```

## 참고
- 차량 이미지 파일명은 스크래퍼 규칙(예: `Acura_ILX_2013_...`)을 따른다고 가정하며, 제조사/모델/연식 정보를 그 구조에서 파싱합니다.
- `data/results.db` 파일에 퀴즈 기록이 누적되므로, 초기화가 필요하면 해당 파일을 삭제하면 됩니다.
