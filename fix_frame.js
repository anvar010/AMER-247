const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');

// We use the MP4 that was downloaded earlier
const videoPath = path.join(__dirname, 'public/hero-bg-fr/44 Clever Bridesmaid Dress Ideas - Pin-44262008833296462.mp4');
const outputFrame = path.join(__dirname, 'public/hero-bg-fr/frame_270.webp');

// Extract exactly the 270th frame (n=269) with NO scaling and at maximum quality (q:v 100, lossless 1)
const cmd = `"${ffmpegPath}" -y -i "${videoPath}" -vf "select='eq(n,269)'" -vframes 1 -vcodec libwebp -lossless 1 -q:v 100 "${outputFrame}"`;

console.log("Extracting high-quality final frame...");
try {
  execSync(cmd, { stdio: 'inherit' });
  console.log("Successfully extracted maximum quality frame 270!");
} catch (e) {
  console.error("Extraction failed:", e.message);
}
