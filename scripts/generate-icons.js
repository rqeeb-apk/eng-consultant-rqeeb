import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(size, bgR, bgG, bgB, accentR, accentG, accentB) {
  const width = size;
  const height = size;
  
  // Create raw RGBA image data
  const rawData = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;
  const radius = size * 0.45;
  const center = size / 2;

  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Check if inside rounded box or circle
      const isInner = dist < radius;
      const isCenterCore = dist < radius * 0.45;

      if (isCenterCore) {
        // Gold / Yellow center lock
        rawData[offset++] = 250; // R
        rawData[offset++] = 204; // G
        rawData[offset++] = 21;  // B
        rawData[offset++] = 255; // A
      } else if (isInner) {
        // Red / Crimson shield gradient
        const t = y / height;
        rawData[offset++] = Math.round(220 * (1 - t * 0.3)); // R
        rawData[offset++] = 38;  // G
        rawData[offset++] = 38;  // B
        rawData[offset++] = 255; // A
      } else {
        // Deep dark blue / slate background
        rawData[offset++] = bgR; // R
        rawData[offset++] = bgG; // G
        rawData[offset++] = bgB; // B
        rawData[offset++] = 255; // A
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      let byte = buf[i];
      for (let j = 0; j < 8; j++) {
        const bit = (crc ^ byte) & 1;
        crc = (crc >>> 1) ^ (bit ? 0xedb88320 : 0);
        byte >>>= 1;
      }
    }
    return (crc ^ -1) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);

    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const crcVal = crc32(Buffer.concat([typeBuf, data]));
    crcBuf.writeUInt32BE(crcVal, 0);

    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPNG(192, 15, 23, 42, 220, 38, 38));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPNG(512, 15, 23, 42, 220, 38, 38));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPNG(180, 15, 23, 42, 220, 38, 38));

console.log('PNG Icons successfully generated in /public!');
