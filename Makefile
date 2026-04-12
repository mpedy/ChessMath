NODE=node
PY=python
UVFLAGS=--host 0.0.0.0 --port 8000
SSLKEYFILE?=certs/key.pem
SSLCERTFILE?=certs/cert.pem
UVFLAGS_HTTPS=--host=0.0.0.0 --port=8000 --ssl-keyfile=$(SSLKEYFILE) --ssl-certfile=$(SSLCERTFILE)

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
	@$(PY) -m uvicorn --reload src.main:app $(UVFLAGS)

run_https: build
	$(PY) -m uvicorn --reload src.main:app $(UVFLAGS_HTTPS)

run_debug: build
	@start npx weinre --boundHost 0.0.0.0 &
	@set REMOTE_DEBUG_WEINRE=1 & $(PY) -m uvicorn --reload src.main:app $(UVFLAGS)

run_https_debug: build
	@start npx weinre --boundHost 0.0.0.0 --keyFile certs/key.pem --certFile certs/cert.pem & npx local-ssl-proxy --source 8043 --target 8080 --cert .\certs\cert.pem --key .\certs\key.pem
	@set REMOTE_DEBUG_WEINRE=1 & $(PY) -m uvicorn --reload src.main:app $(UVFLAGS_HTTPS)

check:
	ruff check

venv:
	python -m venv venv


# Docker commands
docker:
	docker build -t chessmath .

docker_run:
	docker run -p 8000:8000 chessmath