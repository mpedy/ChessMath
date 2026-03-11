FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1
#ENV PYTHONDONTWRITEBYTECODE=1
ENV NODE_VERSION=24

SHELL ["/bin/bash", "--login", "-c"]

RUN apt-get update && apt-get install -y --no-install-recommends build-essential
#RUN apt-get install -y nodejs
#RUN apt-get install -y npm
RUN apt-get install curl -y
# Replace shell with bash so we can source files
#RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /app

COPY requirements.txt .
COPY package.json .
COPY package-lock.json .

RUN python -m pip install --upgrade pip

RUN pip install -r requirements.txt

ENV NVM_DIR=/root/.nvm

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash \
    && . ~/.nvm/nvm.sh \
    && nvm install ${NODE_VERSION} \
    && nvm use ${NODE_VERSION} \
    && nvm install-latest-npm \
    && ln -s "$(which node)" /usr/bin/node \
    && ln -s "$(which npm)" /usr/bin/npm

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

ENTRYPOINT ["bash", "-c", "source $NVM_DIR/nvm.sh && make init && exec \"$@\"", "--"]

CMD ["make", "run"]