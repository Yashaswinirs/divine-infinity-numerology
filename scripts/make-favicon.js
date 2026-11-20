const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const logoPath = path.resolve('public/images/footer/logo2.webp');
  const logoBuf = fs.readFileSync(logoPath);
  const size = 192;
  const strokeWidth = 5;
  const radius = size / 2 - strokeWidth / 2;

  // 1. Create outer circle SVG (dark background + gold border #FFD8A2)
  const circleSvg = Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="#090D22" stroke="#FFD8A2" stroke-width="${strokeWidth}" />
    </svg>
  `);

  // 2. Prepare logo inside circle
  const innerSize = size - strokeWidth * 2 - 2;
  const logoResized = await sharp(logoBuf)
    .resize(innerSize, innerSize, { fit: 'cover' })
    .toBuffer();

  const maskCircle = Buffer.from(`
    <svg width="${innerSize}" height="${innerSize}" viewBox="0 0 ${innerSize} ${innerSize}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${innerSize / 2}" cy="${innerSize / 2}" r="${innerSize / 2}" fill="#fff" />
    </svg>
  `);

  const maskedLogo = await sharp(logoResized)
    .composite([{ input: maskCircle, blend: 'dest-in' }])
    .toBuffer();

  // 3. Composite background + masked logo
  const offset = strokeWidth + 1;
  const finalIcon = await sharp(circleSvg)
    .composite([{ input: maskedLogo, top: offset, left: offset }])
    .png()
    .toBuffer();

  // Write PNG files
  fs.writeFileSync(path.resolve('public/icon.png'), finalIcon);
  fs.writeFileSync(path.resolve('src/app/icon.png'), finalIcon);
  fs.writeFileSync(path.resolve('public/apple-icon.png'), finalIcon);
  fs.writeFileSync(path.resolve('src/app/apple-icon.png'), finalIcon);

  // Write 32x32 favicon.ico
  const icon32 = await sharp(finalIcon).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.resolve('public/favicon.ico'), icon32);
  fs.writeFileSync(path.resolve('src/app/favicon.ico'), icon32);

  // Write SVG favicon
  const base64Data = finalIcon.toString('base64');
  const svgFavicon = `<svg width="100%" height="100%" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <image width="${size}" height="${size}" href="data:image/png;base64,${base64Data}"/>
</svg>`;
  fs.writeFileSync(path.resolve('public/icon.svg'), svgFavicon);
  fs.writeFileSync(path.resolve('src/app/icon.svg'), svgFavicon);

  console.log('SUCCESS: Generated icon.png, apple-icon.png, favicon.ico, and icon.svg in public/ and src/app/');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
