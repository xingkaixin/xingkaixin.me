import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SVG_PATH = path.join(process.cwd(), 'public', 'favicon.svg');
const OUTPUT_LIGHT = path.join(process.cwd(), 'public', 'favicon.png');
const OUTPUT_DARK = path.join(process.cwd(), 'public', 'favicon.dark.png');

async function generateFavicons() {
  try {
    const svgBuffer = fs.readFileSync(SVG_PATH);
    const svgString = svgBuffer.toString();

    // Generate Light Mode Favicon (Black)
    console.log('Generating light mode favicon...');
    await sharp(Buffer.from(svgString))
      .resize(64, 64)
      .png()
      .toFile(OUTPUT_LIGHT);
    console.log(`Saved to ${OUTPUT_LIGHT}`);

    // Generate Dark Mode Favicon (White)
    console.log('Generating dark mode favicon...');
    const svgDarkString = svgString.replace('stroke="black"', 'stroke="white"');
    await sharp(Buffer.from(svgDarkString))
      .resize(64, 64)
      .png()
      .toFile(OUTPUT_DARK);
    console.log(`Saved to ${OUTPUT_DARK}`);

    console.log('Favicon generation complete!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
