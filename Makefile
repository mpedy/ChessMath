NODE=node
PY=python
ifeq ($(OS),Windows_NT)
    PY="venv/Scripts/python"
else
    PY="venv/bin/python"
endif

all: build

init: venv package.json package-lock.json requirements.txt
	npm ci
	@$(PY) -m pip install --upgrade pip
	@$(PY) -m pip install -r requirements.txt

build:
	@$(NODE) build.mjs

run:
	@call venv/Scripts/activate & uvicorn --reload src.main:app --host 0.0.0.0 --port 8000

run_debug:
	@start npx weinre --boundHost 0.0.0.0 &
	@call venv/Scripts/activate & set REMOTE_DEBUG_WEINRE=1 & uvicorn --reload src.main:app --host 0.0.0.0 --port 8000

check:
	ruff check

venv:
	@$(PY) -m venv venv