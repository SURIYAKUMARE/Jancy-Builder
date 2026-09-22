import os
import cv2
import numpy as np
import subprocess
import imageio_ffmpeg

def create_timelapse():
    base_dir = r"d:\Jancy  builders"
    stages_dir = os.path.join(base_dir, "public", "images", "stages")
    videos_dir = os.path.join(base_dir, "public", "videos")
    os.makedirs(videos_dir, exist_ok=True)
    
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    print("Using ffmpeg:", ffmpeg_exe)

    stage_files = [
        f"stage-{i:02d}.jpg" for i in range(1, 13)
    ]
    
    images = []
    for f in stage_files:
        path = os.path.join(stages_dir, f)
        if not os.path.exists(path):
            print("Missing stage image:", path)
            return
        img = cv2.imread(path)
        images.append(img)

    print(f"Loaded {len(images)} stage images.")

    # Target resolution: 1920x1080 for desktop, 720x1280 for mobile
    fps = 30
    hold_frames = 45      # 1.5s hold
    fade_frames = 20      # ~0.67s crossfade
    
    # Desktop video generation via pipe to ffmpeg
    desktop_out = os.path.join(videos_dir, "construction-timelapse.mp4")
    temp_raw = os.path.join(videos_dir, "temp_desktop.mp4")

    # Dimensions
    target_w, target_h = 1920, 1080
    
    # Resize all images to 1920x1080
    resized_images = [cv2.resize(img, (target_w, target_h), interpolation=cv2.INTER_LANCZOS4) for img in images]

    # Command for ffmpeg desktop
    cmd = [
        ffmpeg_exe,
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{target_w}x{target_h}",
        "-pix_fmt", "bgr24",
        "-r", str(fps),
        "-i", "-",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "22",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        desktop_out
    ]

    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    total_stages = len(resized_images)
    for i in range(total_stages):
        current_img = resized_images[i]
        next_img = resized_images[(i + 1) % total_stages]
        
        # Hold current stage with subtle cinematic camera push (Ken Burns)
        for f in range(hold_frames):
            scale = 1.0 + 0.03 * (f / hold_frames)
            M = cv2.getRotationMatrix2D((target_w / 2, target_h / 2), 0, scale)
            zoomed = cv2.warpAffine(current_img, M, (target_w, target_h))
            proc.stdin.write(zoomed.tobytes())
            
        # Crossfade to next
        for f in range(fade_frames):
            alpha = f / float(fade_frames)
            # Smooth ease
            alpha_ease = 0.5 - 0.5 * np.cos(alpha * np.pi)
            blended = cv2.addWeighted(next_img, alpha_ease, current_img, 1.0 - alpha_ease, 0)
            proc.stdin.write(blended.tobytes())

    proc.stdin.close()
    proc.wait()
    print("Desktop video created successfully:", desktop_out)

    # Mobile video: crop center-left (where the house is located: target center 720x1280)
    mobile_out = os.path.join(videos_dir, "construction-timelapse-mobile.mp4")
    cmd_mobile = [
        ffmpeg_exe,
        "-y",
        "-i", desktop_out,
        "-vf", "crop=ih*9/16:ih:iw*0.12:0,scale=720:1280",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "24",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        mobile_out
    ]
    subprocess.run(cmd_mobile, check=True)
    print("Mobile video created successfully:", mobile_out)

if __name__ == "__main__":
    create_timelapse()
