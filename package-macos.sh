#!/bin/bash

# Get version from tauri.conf.json
VERSION=$(grep -o '"version": "[^"]*"' src-tauri/tauri.conf.json | cut -d'"' -f4)

# Package ARM64 version
cd src-tauri/target/aarch64-apple-darwin/release/bundle/
tar -czf "Pomodoro-timer-macos-arm64-${VERSION}.tar.gz" macos
mv "Pomodoro-timer-macos-arm64-${VERSION}.tar.gz" ../../../../../

# Package x64 version
cd ../../x86_64-apple-darwin/release/bundle/
tar -czf "Pomodoro-timer-macos-x64-${VERSION}.tar.gz" macos
mv "Pomodoro-timer-macos-x64-${VERSION}.tar.gz" ../../../../../

cd ../../../../../
echo "Packaging complete!"
echo "Created:"
echo "- Pomodoro-timer-macos-arm64-${VERSION}.tar.gz"
echo "- Pomodoro-timer-macos-x64-${VERSION}.tar.gz"
