import cv2
import os

video_path = "public/hero-bg-fr/44 Clever Bridesmaid Dress Ideas - Pin-44262008833296462.mp4"
output_path = "public/hero-bg-fr/frame_270.webp"

cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)
if fps <= 0: fps = 30

frame_count = 0
extracted_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break
        
    current_time = frame_count / fps
    target_time = extracted_count / 30.0
    
    if current_time >= target_time:
        if extracted_count == 269: # The 270th frame
            # Do NOT scale the frame, and write with maximum WebP quality (100)
            cv2.imwrite(output_path, frame, [cv2.IMWRITE_WEBP_QUALITY, 100])
            print("Successfully regenerated frame_270.webp at MAXIMUM quality and full resolution.")
            break
        extracted_count += 1
        
    frame_count += 1

cap.release()
