#!/bin/bash

# Function to resize base.png to different sizes
resize_icon() {
    size=$1
    output=$2
    magick base.png -resize ${size}x${size} $output
}

# Generate icons of different sizes
resize_icon 32 "32x32.png"
resize_icon 128 "128x128.png"
resize_icon 256 "128x128@2x.png"
resize_icon 512 "icon.png"

# Generate new icns file
mkdir -p icon.iconset
cp "32x32.png" "icon.iconset/icon_16x16@2x.png"
cp "32x32.png" "icon.iconset/icon_32x32.png"
cp "128x128.png" "icon.iconset/icon_128x128.png"
cp "128x128@2x.png" "icon.iconset/icon_128x128@2x.png"

iconutil -c icns icon.iconset -o icon.icns
rm -rf icon.iconset
