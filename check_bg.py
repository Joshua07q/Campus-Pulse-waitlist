from PIL import Image

def check_corners(path):
    try:
        img = Image.open(path).convert("RGBA")
        print(f"--- {path} ---")
        corners = [
            (0, 0), (img.width-1, 0), 
            (0, img.height-1), (img.width-1, img.height-1)
        ]
        total_r, total_g, total_b = 0, 0, 0
        for x, y in corners:
            p = img.getpixel((x, y))
            print(f"Corner ({x},{y}): {p}")
            total_r += p[0]
            total_g += p[1]
            total_b += p[2]
        
        avg_brightness = (total_r + total_g + total_b) / (3 * 4)
        print(f"Avg Corner Brightness: {avg_brightness}")

    except Exception as e:
        print(f"Error: {e}")

check_corners("public/sprites/sp1")
check_corners("public/sprites/sp2")
