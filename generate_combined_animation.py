import json
import base64
from io import BytesIO
from PIL import Image
import os

def create_combined_party_animation(sprite_paths, output_json_path, fps=30):
    """
    Creates a Lottie animation that cycles through multiple sprite images
    to create a transitioning party animation effect
    """
    print(f"Creating combined animation from {len(sprite_paths)} sprites...")
    
    try:
        assets = []
        layers = []
        
        # Load all sprites and create assets
        max_w, max_h = 0, 0
        for i, sprite_path in enumerate(sprite_paths):
            if not os.path.exists(sprite_path):
                print(f"✗ File not found: {sprite_path}")
                continue
                
            print(f"Processing {sprite_path}...")
            img = Image.open(sprite_path).convert("RGBA")
            img_w, img_h = img.size
            max_w = max(max_w, img_w)
            max_h = max(max_h, img_h)
            
            # Process the image to make silhouettes pure black
            datas = img.getdata()
            newData = []
            for item in datas:
                brightness = (item[0] + item[1] + item[2]) / 3
                
                if brightness < 100 and item[3] > 100:
                    # Dark pixel with opacity (silhouette) -> Opaque Black
                    newData.append((0, 0, 0, 255))
                else:
                    # Light or transparent -> Transparent
                    newData.append((0, 0, 0, 0))
            
            img.putdata(newData)
            
            # Save as base64
            buffered = BytesIO()
            img.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
            
            asset_id = f"sprite_{i}"
            assets.append({
                "id": asset_id,
                "w": img_w,
                "h": img_h,
                "u": "",
                "p": "data:image/png;base64," + img_str,
                "e": 1
            })
        
        # Calculate timing
        num_sprites = len(assets)
        frames_per_sprite = 15  # Each sprite shows for 15 frames (0.5 seconds at 30fps)
        total_frames = num_sprites * frames_per_sprite
        
        # Create layers - each sprite appears for a portion of the timeline (static, just switching)
        for i, asset in enumerate(assets):
            start_frame = i * frames_per_sprite
            end_frame = (i + 1) * frames_per_sprite
            
            layer = {
                "ddd": 0,
                "ind": i + 1,
                "ty": 2,
                "nm": f"Sprite {i+1}",
                "refId": asset["id"],
                "sr": 1,
                "ks": {
                    "o": {"a": 0, "k": 100, "ix": 11},
                    "r": {"a": 0, "k": 0, "ix": 10},
                    "p": {"a": 0, "k": [max_w/2, max_h/2, 0], "ix": 2},
                    "a": {"a": 0, "k": [asset["w"]/2, asset["h"]/2, 0], "ix": 1},
                    "s": {"a": 0, "k": [100, 100, 100], "ix": 6}
                },
                "ao": 0,
                "ip": start_frame,
                "op": end_frame,
                "st": start_frame,
                "bm": 0
            }
            layers.append(layer)
        
        lottie_json = {
            "v": "5.5.7",
            "fr": fps,
            "ip": 0,
            "op": total_frames,
            "w": max_w,
            "h": max_h,
            "nm": "Party Person Transition",
            "ddd": 0,
            "assets": assets,
            "layers": layers,
            "markers": []
        }

        with open(output_json_path, "w") as f:
            json.dump(lottie_json, f, indent=2)
            
        print(f"✓ Successfully created {output_json_path}")
        print(f"  Animation: {total_frames} frames at {fps} fps = {total_frames/fps:.1f} seconds")
        print(f"  Cycles through {num_sprites} different poses")

    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    # Combine ss1.png through ss7.png into one animation
    sprite_files = ["ss1.png", "ss2.png", "ss3.png", "ss4.png", "ss5.png", "ss6.png", "ss7.png"]
    sprite_paths = [f"public/{sprite}" for sprite in sprite_files]
    
    output_path = "public/animations/party-person.json"
    
    os.makedirs("public/animations", exist_ok=True)
    
    print("=" * 60)
    print("Generating Combined Party Animation")
    print("=" * 60)
    
    create_combined_party_animation(sprite_paths, output_path)
    
    print("=" * 60)
    print("Done! Use 'party-person.json' for all 3 people")
    print("=" * 60)
