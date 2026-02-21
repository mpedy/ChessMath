PY=python
NODE=node

all: build

build:
	@$(NODE) build.mjs

run:
	@call venv/Scripts/activate & uvicorn --reload src.main:app --host 0.0.0.0 --port 8000

run_debug:
	@start npx weinre --boundHost 0.0.0.0 &
	@call venv/Scripts/activate & set REMOTE_DEBUG_WEINRE=1 & uvicorn --reload src.main:app --host 0.0.0.0 --port 8000

check:
	ruff check