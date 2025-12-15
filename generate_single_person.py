import json
import base64
from io import BytesIO
from PIL import Image
import os

def create_single_person_lottie(sprite_path, output_json_path, fps=30, duration_sec=4):
    """
    Creates a Lottie animation from a sprite sheet with a single person silhouette
    that moves like they're at a party (bouncing, swaying)
    """
    print(f"Processing {sprite_path}...")
    
    try:
        # Load Image
        img = Image.open(sprite_path).convert("RGBA")
        sheet_w, sheet_h = img.size
        
        print(f"Image Size: {sheet_w}x{sheet_h}")
        
        # Process the image to make silhouettes pure black
        datas = img.getdata()
        newData = []
        for item in datas:
            # item is (R, G, B, A)
            brightness = (item[0] + item[1] + item[2]) / 3
            
            if brightness < 100:
                # Dark pixel (silhouette) -> Make it Opaque Black
                newData.append((0, 0, 0, 255))
            else:
                # Light pixel (background) -> Make it Transparent
                newData.append((0, 0, 0, 0))
        
        img.putdata(newData)
        
        # Save as base64
        buffered = BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        asset_id = "silhouette_image"
        
        total_frames = int(fps * duration_sec)
        
        # Create animation keyframes for party movement
        # Bouncing up and down with smoother easing
        position_keyframes = []
        rotation_keyframes = []
        
        # Create smooth bouncing and swaying motion with more keyframes
        num_bounces = 8  # More bounces for smoother animation
        for i in range(num_bounces + 1):
            t = int(i * (total_frames / num_bounces))
            if i % 2 == 0:
                # Down position, slight left rotation
                position_keyframes.append({
                    "t": t,
                    "s": [sheet_w/2, sheet_h/2, 0],
                    "i": {"x": [0.42], "y": [1]},  # Smoother easing
                    "o": {"x": [0.58], "y": [0]}
                })
                rotation_keyframes.append({
                    "t": t,
                    "s": [-3],
                    "i": {"x": [0.42], "y": [1]},
                    "o": {"x": [0.58], "y": [0]}
                })
            else:
                # Up position, slight right rotation
                position_keyframes.append({
                    "t": t,
                    "s": [sheet_w/2, sheet_h/2 - 10, 0],
                    "i": {"x": [0.42], "y": [1]},
                    "o": {"x": [0.58], "y": [0]}
                })
                rotation_keyframes.append({
                    "t": t,
                    "s": [3],
                    "i": {"x": [0.42], "y": [1]},
                    "o": {"x": [0.58], "y": [0]}
                })
        
        lottie_json = {
            "v": "5.5.7",
            "fr": fps,
            "ip": 0,
            "op": total_frames,
            "w": sheet_w,
            "h": sheet_h,
            "nm": "Single Person Party",
            "ddd": 0,
            "assets": [{
                "id": asset_id,
                "w": sheet_w,
                "h": sheet_h,
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
                    "a": {"a": 0, "k": [sheet_w/2, sheet_h/2, 0], "ix": 1},
                    "s": {"a": 0, "k": [100, 100, 100], "ix": 6}
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
            
        print(f"Successfully created Lottie JSON at {output_json_path}")
        print(f"Animation: {total_frames} frames at {fps} fps = {duration_sec} seconds")

    except Exception as e:
        print(f"Error processing: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    # Use the silhouettes-static.png file
    input_path = "public/silhouettes-static.png"
    output_path = "public/animations/single-person.json"
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    create_single_person_lottie(input_path, output_path)
