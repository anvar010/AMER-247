const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const videoPath = path.join(__dirname, 'public/hero-bg-fr/44 Clever Bridesmaid Dress Ideas - Pin-44262008833296462.mp4');
const outputDir = path.join(__dirname, 'public/hero-bg-fr');

// To ensure maximum scroll smoothness, we scale the height to 800px (plenty for mobile)
// and heavily optimize the webp quality so they load instantly
const cmd = `"${ffmpegPath}" -i "${videoPath}" -t 8 -vf "fps=30,scale=-2:800" -vcodec libwebp -lossless 0 -compression_level 4 -q:v 60 "${outputDir}/frame_%03d.webp"`;

console.log("Extracting frames with ffmpeg...");
try {
  execSync(cmd, { stdio: 'inherit' });
  
  // Count frames
  const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.webp'));
  console.log(`Successfully generated ${files.length} frames.`);
} catch (e) {
  console.error("Extraction failed:", e);
}
