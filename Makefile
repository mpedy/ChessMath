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

run: build
	@$(PY) -m uvicorn --reload src.main:app --host 0.0.0.0 --port 8000

run_debug: build
	@start npx weinre --boundHost 0.0.0.0 &
	@set REMOTE_DEBUG_WEINRE=1 & $(PY) -m uvicorn --reload src.main:app --host 0.0.0.0 --port 8000

check:
	ruff check

venv:
	python -m venv venv


# Docker commands
docker:
	docker build -t chessmath .

docker_run: docker
	docker run -p 8000:8000 chessmath