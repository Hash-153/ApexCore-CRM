.PHONY: all install build test start dev clean docker-build docker-up

all: install build test

install:
	npm install --no-audit --no-fund

build:
	npm run build

test:
	node --test --experimental-strip-types server/tests/*.test.ts

start:
	node --experimental-strip-types server/src/server.ts

dev:
	npm run dev

docker-build:
	docker build -t medicore-health-os:latest .

docker-up:
	docker-compose up -d

clean:
	rm -rf dist dist-server dist-client logs/*.log
