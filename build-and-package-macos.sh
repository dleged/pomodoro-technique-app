#!/bin/bash

echo "🏗️  Building and packaging macOS versions..."

# Get version from tauri.conf.json
VERSION=$(grep -o '"version": "[^"]*"' src-tauri/tauri.conf.json | cut -d'"' -f4)

# Build Intel version
echo "📦 Building Intel (x64) version..."
npm run build-macos-intel

# Build Silicon version
echo "📦 Building Silicon (ARM64) version..."
npm run build-macos-silicon

# Package ARM64 version
echo "🎁 Packaging Silicon (ARM64) version..."
cd src-tauri/target/aarch64-apple-darwin/release/bundle/
tar -czf "Pomodoro-timer-macos-arm64-${VERSION}.tar.gz" macos
mv "Pomodoro-timer-macos-arm64-${VERSION}.tar.gz" ../../../../../

# Package x64 version
echo "🎁 Packaging Intel (x64) version..."
cd ../../x86_64-apple-darwin/release/bundle/
tar -czf "Pomodoro-timer-macos-x64-${VERSION}.tar.gz" macos
mv "Pomodoro-timer-macos-x64-${VERSION}.tar.gz" ../../../../../

cd ../../../../../
echo "✨ All done! Created:"
echo "- Pomodoro-timer-macos-arm64-${VERSION}.tar.gz"
echo "- Pomodoro-timer-macos-x64-${VERSION}.tar.gz"
