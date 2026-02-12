PY=python
NODE=node

all: build

build:
	@$(NODE) build.mjs

run:
	@./server_start_py

check:
	ruff check