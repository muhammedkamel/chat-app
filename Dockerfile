FROM oven/bun:alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY . .

RUN bun install

CMD [ "bun", "run", "dev" ]