from PIL import Image
import os

def make_transparent(input_path, output_path):
    """
    Makes the background of sprite images transparent
    Keeps only dark pixels (silhouettes) and makes everything else transparent
    """
    print(f"Processing {input_path}...")
    
    try:
        # Load image
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        transparent_count = 0
        dark_count = 0
        
        for item in datas:
            # item is (R, G, B, A)
            brightness = (item[0] + item[1] + item[2]) / 3
            
            # More aggressive threshold - anything not very dark becomes transparent
            if brightness < 50:  # Very dark pixels only
                newData.append((0, 0, 0, 255))
                dark_count += 1
            else:
                # Everything else becomes transparent
                newData.append((0, 0, 0, 0))
                transparent_count += 1
        
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"✓ Saved: {dark_count} dark pixels, {transparent_count} transparent pixels")
        
    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    sprites = ["ss1.png", "ss2.png", "ss3.png", "ss4.png", "ss5.png", "ss6.png", "ss7.png"]
    
    print("=" * 60)
    print("Making Sprite Backgrounds Transparent")
    print("=" * 60)
    
    for sprite in sprites:
        input_path = f"public/{sprite}"
        output_path = f"public/{sprite}"  # Overwrite original
        
        if os.path.exists(input_path):
            make_transparent(input_path, output_path)
        else:
            print(f"✗ File not found: {input_path}")
    
    print("=" * 60)
    print("Done! All sprites now have transparent backgrounds")
    print("=" * 60)
