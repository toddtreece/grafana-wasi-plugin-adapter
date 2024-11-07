# WASM Component Conversion Example

1. Install Rust via [rustup](https://rustup.rs/).
2. Install Node.js [Node.js](https://nodejs.org/).
3. `make run`

```
make run
   Compiling wasi-runner v0.1.0
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 3.87s
     Running `target/debug/wasi-runner`

Load time: 7.255360815s

ConversionRequest {
    uid: "123",
    objects: [],
    target-version: None,
}

ConversionResponse {
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

convert-objects execution time: 398.991µs
```