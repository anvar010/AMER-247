import cv2
import os

video_path = "public/hero-bg-fr/44 Clever Bridesmaid Dress Ideas - Pin-44262008833296462.mp4"
output_dir = "public/hero-bg-fr"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Remove any existing frames to prevent conflicts
for f in os.listdir(output_dir):
    if f.endswith('.webp') and f.startswith('frame_'):
        os.remove(os.path.join(output_dir, f))

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error: Could not open video.")
    exit(1)

fps = cap.get(cv2.CAP_PROP_FPS)
if fps <= 0: fps = 30

frame_count = 0
extracted_count = 0
max_extracted = 9 * 30  # 9 seconds at 30 fps = 270 frames

print(f"Original FPS: {fps}, Target FPS: 30")

while True:
    ret, frame = cap.read()
    if not ret:
        break
        
    # Interpolate to strictly 30fps
    current_time = frame_count / fps
    target_time = extracted_count / 30.0
    
    if current_time >= target_time:
        if extracted_count >= max_extracted:
            break
            
        # Scale image to height 800 for maximum mobile scroll performance
        h, w = frame.shape[:2]
        if h > 800:
            scale = 800.0 / h
            new_w = int(w * scale)
            frame = cv2.resize(frame, (new_w, 800), interpolation=cv2.INTER_AREA)
            
        out_path = os.path.join(output_dir, f"frame_{extracted_count+1:03d}.webp")
        # Write directly to high-compression WebP
        cv2.imwrite(out_path, frame, [cv2.IMWRITE_WEBP_QUALITY, 60])
        extracted_count += 1
        
    frame_count += 1

cap.release()
print(f"Successfully generated {extracted_count} frames.")
