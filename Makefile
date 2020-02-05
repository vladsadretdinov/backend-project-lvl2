install: install-deps

run:
	npx run start

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npm run lint