import json
import base64
from io import BytesIO
from PIL import Image
import os

def create_lottie_from_sprites(sprite_path, output_json_path, num_frames=5, fps=30, duration_sec=1.5):
    print(f"Processing {sprite_path}...")
    
    try:
        # Load Image
        img = Image.open(sprite_path).convert("RGBA")
        sheet_w, sheet_h = img.size
        # Recalculate frame width based on assumption or fixed number
        # If the sheet is 5 frames wide
        frame_w = sheet_w // num_frames
        frame_h = sheet_h
        
        print(f"Sheet Size: {sheet_w}x{sheet_h}. Frame Size: {frame_w}x{frame_h}")

        lottie_assets = []
        lottie_layers = []
        
        total_frames = int(fps * duration_sec)
        frames_per_sprite = total_frames // num_frames

        for i in range(num_frames):
            # Crop
            box = (i * frame_w, 0, (i + 1) * frame_w, frame_h)
            frame_img = img.crop(box)
            
            # IMPROVED MASKING LOGIC
            # Strategy: Only keep pixel if it is DARK. Everything else is transparent.
            # This handles light gray artifacts by making them transparent, avoiding the "Black Box" issue.
            datas = frame_img.getdata()
            newData = []
            for item in datas:
                # item is (R, G, B, A)
                # Check brightness. If it's dark (silhouette), keep it.
                brightness = (item[0] + item[1] + item[2]) / 3
                
                if brightness < 100:
                    # It's a dark pixel (silhouette) -> Make it Opaque Black
                    newData.append((0, 0, 0, 255))
                else:
                    # It's a light pixel (background/artifact) -> Make it Transparent
                    newData.append((0, 0, 0, 0))
            
            frame_img.putdata(newData)
            
            # Save Base64
            buffered = BytesIO()
            frame_img.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
            
            asset_id = f"image_{i}"
            lottie_assets.append({
                "id": asset_id,
                "w": frame_w,
                "h": frame_h,
                "u": "",
                "p": "data:image/png;base64," + img_str,
                "e": 1
            })

            # Layer
            start_frame = i * frames_per_sprite
            end_frame = (i + 1) * frames_per_sprite
            
            layer = {
                "ddd": 0,
                "ind": i + 1,
                "ty": 2, 
                "nm": f"Frame {i}",
                "refId": asset_id,
                "sr": 1,
                "ks": {
                    "o": { "a": 0, "k": 100, "ix": 11 },
                    "r": { "a": 0, "k": 0, "ix": 10 },
                    "p": { "a": 0, "k": [frame_w/2, frame_h/2, 0], "ix": 2 },
                    "a": { "a": 0, "k": [frame_w/2, frame_h/2, 0], "ix": 1 },
                    "s": { "a": 0, "k": [100, 100, 100], "ix": 6 }
                },
                "ao": 0,
                "ip": start_frame,
                "op": end_frame,
                "st": start_frame,
                "bm": 0
            }
            lottie_layers.append(layer)

        lottie_json = {
            "v": "5.5.7",
            "fr": fps,
            "ip": 0,
            "op": total_frames,
            "w": frame_w,
            "h": frame_h,
            "nm": "Crowd Animation",
            "ddd": 0,
            "assets": lottie_assets,
            "layers": lottie_layers
        }

        with open(output_json_path, "w") as f:
            json.dump(lottie_json, f)
            
        print(f"Successfully created Lottie JSON at {output_json_path}")

    except Exception as e:
        print(f"Error processing: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    input_path = r"C:\Users\dell\.gemini\antigravity\brain\3eec3ac7-9759-4f9e-953f-c45f1ef96733\party_sprites_bw_v4_1765307460497.png"
    output_path = r"c:\Users\dell\Desktop\Projects\Campus Pulse website\campus-pulse-website\public\animations\crowd.json"
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    create_lottie_from_sprites(input_path, output_path)
