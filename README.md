# WASM Component Conversion Example

1. Install Rust via [rustup](https://rustup.rs/).
2. Install Node.js [Node.js](https://nodejs.org/).
3. `make run`

```
make run
   Compiling wasi-runner v0.1.0 
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 3.92s
     Running `target/debug/wasi-runner`

ConversionRequest: ConversionRequest {
    uid: "123",
    objects: [],
    target-version: None,
}

ConversionResponse: ConversionResponse {
    uid: "123",
    status: Some(
        StatusResult {
            status: "Success",
            message: "Converted successfully",
            reason: "",
            code: 0,
        },
    ),
    objects: [],
}
```