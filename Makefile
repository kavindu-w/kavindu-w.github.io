.PHONY: dev build preview clean install

dev:
	npm run dev

build:
	npm run build

preview: build
	npm run preview

clean:
	rm -rf dist node_modules

install:
	npm install
