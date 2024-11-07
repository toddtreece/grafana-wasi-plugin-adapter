use wasmtime::{
    component::{bindgen, Component, Linker},
    Config, Engine, Result, Store,
};
use wasmtime_wasi::{ResourceTable, WasiCtx, WasiCtxBuilder, WasiView};

bindgen!({
    world: "conversion",
    path: "../plugin.wit",
});

struct State {
    table: ResourceTable,
    wasi: WasiCtx,
}

impl WasiView for State {
    fn table(&mut self) -> &mut ResourceTable {
        &mut self.table
    }
    fn ctx(&mut self) -> &mut WasiCtx {
        &mut self.wasi
    }
}

fn main() -> Result<()> {
    let start_time = std::time::Instant::now();
    let mut builder = WasiCtxBuilder::new();
    builder.inherit_stdio();
    let engine = Engine::new(Config::new().wasm_component_model(true))?;

    let component = Component::from_file(&engine, "../example/convert.component.wasm").unwrap();
    let mut store = Store::new(
        &engine,
        State {
            table: ResourceTable::new(),
            wasi: builder.build(),
        },
    );

    let mut linker = Linker::new(&engine);
    wasmtime_wasi::add_to_linker_sync(&mut linker)?;
    let convert = Conversion::instantiate(&mut store, &component, &linker)?;
    let setup_complete = std::time::Instant::now();
    println!("\nLoad time: {:?}\n", setup_complete - start_time);

    let request = ConversionRequest {
        uid: "123".to_string(),
        target_version: None,
        objects: vec![],
    };
    println!("{request:#?}\n");

    let response = convert.call_convert_objects(&mut store, &request)?;
    println!("{response:#?}\n");

    let end_time = std::time::Instant::now();
    println!("convert-objects execution time: {:?}", end_time - setup_complete);

    Ok(())
}
