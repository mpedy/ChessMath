FROM python:3.12-slim

COPY requirements.txt .
COPY package.json .
COPY package-lock.json .


RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    nodejs \
    npm

RUN python -m pip install --upgrade pip

RUN pip install -r requirements.txt

RUN npm ci

ENV PYTHONUNBUFFERED=1
#ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY myplugin__define_var.cjs .
COPY Makefile .
COPY eslint.config.mjs .
COPY build.mjs .
COPY browserslistToEsbuild.mjs .
COPY babel.config.json .
COPY .browserslistrc .
COPY static/ ./static/
COPY src/ ./src/
COPY pages/ ./pages/

EXPOSE 8000

CMD ["make", "run"]