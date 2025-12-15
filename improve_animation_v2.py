
import json
import base64
from io import BytesIO
from PIL import Image, ImageFilter
import os
import glob
import math

def remove_background(img, tolerance=60):
    """
    Makes the background transparent and erodes the edges to remove halos.
    """
    img = img.convert("RGBA")
    datas = img.getdata()
    
    # Get background color sample from top-left
    bg_color = datas[0][:3]
    
    newData = []
    
    for item in datas:
        # Calculate color distance
        dist = math.sqrt(
            (item[0] - bg_color[0])**2 + 
            (item[1] - bg_color[1])**2 + 
            (item[2] - bg_color[2])**2
        )
        
        # If close to background color, make transparent
        if dist < tolerance:
             newData.append((0, 0, 0, 0))
        else:
             newData.append(item)
             
    img.putdata(newData)
    
    # Erode the alpha channel to remove "purple glow" / halos
    # Extract alpha
    alpha = img.split()[3]
    # Filter: MinFilter(3) is a 3x3 erosion (shrinks the white/opaque area)
    alpha = alpha.filter(ImageFilter.MinFilter(3))
    # Put alpha back
    img.putalpha(alpha)
    
    return img

def create_optimized_lottie(input_files, output_json_path, fps=8, loop_duration_per_file=1.0):
    print(f"Processing files: {input_files}")
    
    all_frames = []
    
    # 1. Extract Frames
    for file_path in input_files:
        try:
            if not os.path.exists(file_path):
                print(f"Error: {file_path} does not exist.")
                continue

            start_img = Image.open(file_path)
            
            # Remove background first
            img = remove_background(start_img)
            
            sheet_w, sheet_h = img.size
            
            # Assume equal width frames (strip)
            num_frames = max(1, round(sheet_w / sheet_h))
            raw_frame_w = sheet_w // num_frames
            raw_frame_h = sheet_h
            
            print(f"File: {os.path.basename(file_path)} | Sheet: {sheet_w}x{sheet_h} | Detected Frames: {num_frames} ({raw_frame_w}x{raw_frame_h})")

            for i in range(num_frames):
                box = (i * raw_frame_w, 0, (i + 1) * raw_frame_w, raw_frame_h)
                frame = img.crop(box)
                all_frames.append(frame)
                
        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    if not all_frames:
        print("No frames extracted!")
        return

    # 2. STABILIZE / GLOBAL CROP
    # Do NOT center individual frames (causes "collision"/jitter).
    # Instead, find the bounding box of the UNION of all frames, 
    # and crop every frame to that same box.
    
    # Initialize with inverted values
    min_x, min_y = all_frames[0].width, all_frames[0].height
    max_x, max_y = 0, 0
    
    has_content = False
    
    # Check all frames to find the MAX extent of the content (union)
    for frame in all_frames:
        bbox = frame.getbbox() 
        if bbox:
            has_content = True
            min_x = min(min_x, bbox[0])
            min_y = min(min_y, bbox[1])
            max_x = max(max_x, bbox[2])
            max_y = max(max_y, bbox[3])
    
    if not has_content:
        print("Warning: No content found!")
        min_x, min_y = 0, 0
        max_x, max_y = all_frames[0].width, all_frames[0].height

    # Padding
    padding = 2
    min_x = max(0, min_x - padding)
    min_y = max(0, min_y - padding)
    max_x = min(all_frames[0].width, max_x + padding)
    max_y = min(all_frames[0].height, max_y + padding)

    crop_w = max_x - min_x
    crop_h = max_y - min_y
    
    print(f"Stabilized Crop Box: {min_x},{min_y} -> {max_x},{max_y} ({crop_w}x{crop_h})")

    # 3. Generate Lottie Structure
    lottie_assets = []
    lottie_layers = []
    
    # Further reduced FPS as requested ("slow down")
    fps = 6
    total_lottie_frames = len(all_frames)
    
    print(f"Lottie Config: {fps} FPS, {total_lottie_frames} total frames.")

    for i, frame in enumerate(all_frames):
        # Crop to the STABILIZED box
        cropped_frame = frame.crop((min_x, min_y, max_x, max_y))
        
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
        # Each frame is visible for 1 unit
        start_frame = i
        end_frame = i + 1

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
        "nm": "Crowd Stabilized",
        "ddd": 0,
        "assets": lottie_assets,
        "layers": lottie_layers
    }

    with open(output_json_path, "w") as f:
        json.dump(lottie_json, f)
        
    print(f"Successfully created Stabilized Lottie JSON at {output_json_path}")

if __name__ == "__main__":
    # Files to process
    inputs = [
        r"public/sprites/sp1",
        r"public/sprites/sp2"
    ]
    output = r"public/animations/crowd.json"
    
    create_optimized_lottie(inputs, output, fps=8)
