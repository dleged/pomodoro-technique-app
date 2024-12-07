#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            // Enable window resizing and movement, but disable fullscreen
            window.set_decorations(true).unwrap();
            window.set_resizable(true).unwrap();
            window.set_fullscreen(false).unwrap();
            // Disable maximize button
            window.set_maximizable(false).unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
