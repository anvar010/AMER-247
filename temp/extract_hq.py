import cv2
import os

video_path = "public/hero-bg-fr/44 Clever Bridesmaid Dress Ideas - Pin-44262008833296462.mp4"
output_dir = "public/hero-bg-fr"

print("Starting High-Quality Extraction...")

cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)
if fps <= 0: fps = 30

frame_count = 0
extracted_count = 0
max_extracted = 9 * 30  # 270 frames

while True:
    ret, frame = cap.read()
    if not ret:
        break
        
    current_time = frame_count / fps
    target_time = extracted_count / 30.0
    
    if current_time >= target_time:
        if extracted_count >= max_extracted:
            break
            
        # Optional: scale down ONLY if the video is massive (e.g., 4K).
        # Otherwise, keep native 1080p resolution.
        h, w = frame.shape[:2]
        if h > 1200:
            scale = 1200.0 / h
            new_w = int(w * scale)
            frame = cv2.resize(frame, (new_w, 1200), interpolation=cv2.INTER_AREA)
            
        out_path = os.path.join(output_dir, f"frame_{extracted_count+1:03d}.webp")
        # Increase WebP Quality from 60 to 90 for much better clarity
        cv2.imwrite(out_path, frame, [cv2.IMWRITE_WEBP_QUALITY, 90])
        extracted_count += 1
        
        if extracted_count % 30 == 0:
            print(f"Extracted {extracted_count} frames...")
        
    frame_count += 1

cap.release()
print(f"Successfully generated {extracted_count} high-quality frames!")
