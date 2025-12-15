
import json
import base64
from io import BytesIO
from PIL import Image
import os

def create_optimized_lottie(sprite_path, output_json_path, num_frames=5, fps=24, loop_duration=1.0):
    print(f"Processing {sprite_path}...")
    
    try:
        if not os.path.exists(sprite_path):
            print(f"Error: {sprite_path} does not exist.")
            return

        img = Image.open(sprite_path).convert("RGBA")
        sheet_w, sheet_h = img.size
        
        # Assume horizontal strip
        raw_frame_w = sheet_w // num_frames
        raw_frame_h = sheet_h
        
        print(f"Sheet: {sheet_w}x{sheet_h} | Raw Frame: {raw_frame_w}x{raw_frame_h}")

        frames = []
        # Extract frames
        for i in range(num_frames):
            box = (i * raw_frame_w, 0, (i + 1) * raw_frame_w, raw_frame_h)
            frame = img.crop(box)
            frames.append(frame)

        # "Remove black borders" + "Reduce size" => Crop to content
        # Find the union bounding box of all frames to keep them aligned relative to each other?
        # OR crop each one tight?
        # If the sprite moves around, cropping tight will jitter.
        # Ideally, we find the bbox of the NON-TRANSPARENT pixels across ALL frames to center it.
        
        # Calculate global bounding box
        min_x, min_y = raw_frame_w, raw_frame_h
        max_x, max_y = 0, 0
        
        has_content = False
        for frame in frames:
            bbox = frame.getbbox() # Returns (left, upper, right, lower)
            if bbox:
                has_content = True
                min_x = min(min_x, bbox[0])
                min_y = min(min_y, bbox[1])
                max_x = max(max_x, bbox[2])
                max_y = max(max_y, bbox[3])
        
        if not has_content:
            print("Warning: No content found in frames!")
            # Fallback
            min_x, min_y, max_x, max_y = 0, 0, raw_frame_w, raw_frame_h

        # Add a small padding
        padding = 2
        min_x = max(0, min_x - padding)
        min_y = max(0, min_y - padding)
        max_x = min(raw_frame_w, max_x + padding)
        max_y = min(raw_frame_h, max_y + padding)

        crop_w = max_x - min_x
        crop_h = max_y - min_y
        
        print(f"Cropped Frame Size: {crop_w}x{crop_h} (from {min_x},{min_y} to {max_x},{max_y})")

        # Resize to reduce size further if needed (optional, keeping resolution for now but cropped)
        # target_h = 300
        # scale = target_h / crop_h
        # if scale < 1:
        #     new_w = int(crop_w * scale)
        #     new_h = int(crop_h * scale)
        #     crop_w, crop_h = new_w, new_h
        
        lottie_assets = []
        lottie_layers = []
        
        # Timing
        total_lottie_frames = int(fps * loop_duration)
        frames_per_sprite_duration = total_lottie_frames // num_frames
        
        # If we have few frames, just cycle them
        print(f"Lottie Frames: {total_lottie_frames} | Frames per sprite: {frames_per_sprite_duration}")

        for i, frame in enumerate(frames):
            # Crop to common bounding box to remove borders but maintain alignment
            cropped_frame = frame.crop((min_x, min_y, max_x, max_y))
            
            # Save Base64
            buffered = BytesIO()
            cropped_frame.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
            
            asset_id = f"image_{i}"
            lottie_assets.append({
                "id": asset_id,
                "w": crop_w,
                "h": crop_h,
                "u": "",
                "p": "data:image/png;base64," + img_str,
                "e": 1
            })

            # Layer
            start_frame = i * frames_per_sprite_duration
            # Ensure the last frame fills the remainder
            if i == num_frames - 1:
                end_frame = total_lottie_frames
            else:
                end_frame = (i + 1) * frames_per_sprite_duration

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
                    "p": { "a": 0, "k": [crop_w/2, crop_h/2, 0], "ix": 2 },
                    "a": { "a": 0, "k": [crop_w/2, crop_h/2, 0], "ix": 1 },
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
            "op": total_lottie_frames,
            "w": crop_w,
            "h": crop_h,
            "nm": "Crowd Optimized",
            "ddd": 0,
            "assets": lottie_assets,
            "layers": lottie_layers
        }

        with open(output_json_path, "w") as f:
            json.dump(lottie_json, f)
            
        print(f"Successfully created optimized Lottie JSON at {output_json_path}")

    except Exception as e:
        print(f"Error processing: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    # Use the transparent sprite sheet
    input_path = r"public/sprites/party-sprites-transparent.png"
    output_path = r"public/animations/crowd.json"
    
    # Check if transparent exists, if not try regular
    if not os.path.exists(input_path):
        input_path = r"public/sprites/party-sprites.png"

    # Adjust parameters for better fluidity
    # 5 frames in 1.0 second = 5 FPS effective check
    # To be "fluid" with 5 frames is hard, but we make it snappier.
    # User said "motion isnt fluid".
    # A crowd animation typically loops. 1 second loop is reasonable for 5 frames (jumping/dancing).
    create_optimized_lottie(input_path, output_path, num_frames=5, fps=30, loop_duration=1.0)
