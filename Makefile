example/convert.component.wasm: example/index.ts
	@cd example && npm run build

.PHONY: example
example: example/convert.component.wasm
	

.PHONY: run
run: example
	@cd rust && cargo run