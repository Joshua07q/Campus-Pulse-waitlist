from PIL import Image
import os

files = ["public/sprites/sp1", "public/sprites/sp2"]

for f in files:
    try:
        img = Image.open(f)
        print(f"File: {f}")
        print(f"Format: {img.format}")
        print(f"Size: {img.size}")
        print(f"Mode: {img.mode}")
    except Exception as e:
        print(f"Error {f}: {e}")
