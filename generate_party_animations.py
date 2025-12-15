import json
import base64
from io import BytesIO
from PIL import Image
import os

def create_party_person_lottie(sprite_path, output_json_path, fps=6, duration_sec=4):
    """
    Creates a Lottie animation from a single sprite image
    with party-like bouncing and swaying motion
    """
    print(f"Processing {sprite_path}...")
    
    try:
        # Load Image
        img = Image.open(sprite_path).convert("RGBA")
        img_w, img_h = img.size
        
        print(f"Image Size: {img_w}x{img_h}")
        
        # Process the image to make silhouettes pure black
        datas = img.getdata()
        newData = []
        for item in datas:
            # item is (R, G, B, A)
            brightness = (item[0] + item[1] + item[2]) / 3
            
            if brightness < 100 and item[3] > 100:
                # Dark pixel with opacity (silhouette) -> Make it Opaque Black
                newData.append((0, 0, 0, 255))
            else:
                # Light pixel or transparent (background) -> Make it Transparent
                newData.append((0, 0, 0, 0))
        
        img.putdata(newData)
        
        # Save as base64
        buffered = BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        asset_id = "silhouette_image"
        
        total_frames = int(fps * duration_sec)
        
        # Create animation keyframes for party movement
        # Bouncing up and down with swaying
        position_keyframes = []
        rotation_keyframes = []
        scale_keyframes = []
        
        # Create smooth bouncing and swaying motion
        num_bounces = 4
        for i in range(num_bounces + 1):
            t = i * (total_frames // num_bounces)
            if t > total_frames:
                t = total_frames
                
            if i % 2 == 0:
                # Down position, slight left rotation, normal scale
                position_keyframes.append({
                    "t": t,
                    "s": [img_w/2, img_h/2, 0],
                    "i": {"x": [0.667], "y": [1]},
                    "o": {"x": [0.333], "y": [0]}
                })
                rotation_keyframes.append({
                    "t": t,
                    "s": [-4],
                    "i": {"x": [0.667], "y": [1]},
                    "o": {"x": [0.333], "y": [0]}
                })
                scale_keyframes.append({
                    "t": t,
                    "s": [100, 100, 100],
                    "i": {"x": [0.667, 0.667, 0.667], "y": [1, 1, 1]},
                    "o": {"x": [0.333, 0.333, 0.333], "y": [0, 0, 0]}
                })
            else:
                # Up position, slight right rotation, slightly bigger scale
                position_keyframes.append({
                    "t": t,
                    "s": [img_w/2, img_h/2 - 15, 0],
                    "i": {"x": [0.667], "y": [1]},
                    "o": {"x": [0.333], "y": [0]}
                })
                rotation_keyframes.append({
                    "t": t,
                    "s": [4],
                    "i": {"x": [0.667], "y": [1]},
                    "o": {"x": [0.333], "y": [0]}
                })
                scale_keyframes.append({
                    "t": t,
                    "s": [105, 105, 100],
                    "i": {"x": [0.667, 0.667, 0.667], "y": [1, 1, 1]},
                    "o": {"x": [0.333, 0.333, 0.333], "y": [0, 0, 0]}
                })
        
        lottie_json = {
            "v": "5.5.7",
            "fr": fps,
            "ip": 0,
            "op": total_frames,
            "w": img_w,
            "h": img_h,
            "nm": "Party Person",
            "ddd": 0,
            "assets": [{
                "id": asset_id,
                "w": img_w,
                "h": img_h,
                "u": "",
                "p": "data:image/png;base64," + img_str,
                "e": 1
            }],
            "layers": [{
                "ddd": 0,
                "ind": 1,
                "ty": 2,
                "nm": "Person Silhouette",
                "refId": asset_id,
                "sr": 1,
                "ks": {
                    "o": {"a": 0, "k": 100, "ix": 11},
                    "r": {
                        "a": 1,
                        "k": rotation_keyframes,
                        "ix": 10
                    },
                    "p": {
                        "a": 1,
                        "k": position_keyframes,
                        "ix": 2
                    },
                    "a": {"a": 0, "k": [img_w/2, img_h/2, 0], "ix": 1},
                    "s": {
                        "a": 1,
                        "k": scale_keyframes,
                        "ix": 6
                    }
                },
                "ao": 0,
                "ip": 0,
                "op": total_frames,
                "st": 0,
                "bm": 0
            }],
            "markers": []
        }

        with open(output_json_path, "w") as f:
            json.dump(lottie_json, f, indent=2)
            
        print(f"✓ Successfully created {output_json_path}")

    except Exception as e:
        print(f"✗ Error processing {sprite_path}: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    # Create animations for ss1.png through ss7.png
    sprites = ["ss1.png", "ss2.png", "ss3.png", "ss4.png", "ss5.png", "ss6.png", "ss7.png"]
    
    os.makedirs("public/animations", exist_ok=True)
    
    print("=" * 60)
    print("Generating Party Person Animations")
    print("=" * 60)
    
    for sprite in sprites:
        input_path = f"public/{sprite}"
        output_name = sprite.replace(".png", ".json")
        output_path = f"public/animations/{output_name}"
        
        if os.path.exists(input_path):
            create_party_person_lottie(input_path, output_path)
        else:
            print(f"✗ File not found: {input_path}")
    
    print("=" * 60)
    print("Done!")
    print("=" * 60)
