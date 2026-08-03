/**
 * Rasterizes the brand mark (public/favicon.svg) into the PNG icon set used by
 * the web manifest, Android/Chrome, and iOS home screens. SVG favicons are
 * great for browsers but PWABuilders, app installers, and some crawlers still
 * expect raster PNGs at fixed sizes.
 *
 * Run with: npx tsx scripts/generate-icons.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const publicDir = join(process.cwd(), 'public')

/** Brand black. Icons are flattened onto this so no target ships transparency. */
const BG = { r: 13, g: 13, b: 13 }

const targets: { file: string; size: number }[] = [
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
]

/** Sizes packed into favicon.ico. 48 is the one Google renders in search results. */
const icoSizes = [16, 32, 48]

/**
 * Builds a .ico containing PNG-encoded frames. Every browser since IE Vista
 * reads PNG-in-ICO, and sharp cannot write ICO itself, so the 22-byte-per-frame
 * container is assembled by hand rather than pulling in a dependency.
 */
function buildIco(frames: { size: number; png: Buffer }[]): Buffer {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: 1 = icon
  header.writeUInt16LE(frames.length, 4)

  let offset = 6 + frames.length * 16
  const entries: Buffer[] = []
  for (const { size, png } of frames) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // 0 encodes 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1)
    entry.writeUInt8(0, 2) // palette size
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // color planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(png.length, 8)
    entry.writeUInt32LE(offset, 12)
    entries.push(entry)
    offset += png.length
  }

  return Buffer.concat([header, ...entries, ...frames.map((f) => f.png)])
}

async function main() {
  const svg = readFileSync(join(publicDir, 'favicon.svg'))

  const render = (size: number) =>
    sharp(svg, { density: 384 })
      .resize(size, size, { fit: 'contain', background: { ...BG, alpha: 1 } })
      // resize() only paints `background` where it letterboxes; source and target
      // are both square, so nothing is ever letterboxed and the mark's own
      // transparency survives. flatten() is what actually makes the icon opaque —
      // iOS ignores alpha and would otherwise composite the corners to black.
      .flatten({ background: BG })
      .png()

  for (const { file, size } of targets) {
    const png = await render(size).toBuffer()
    writeFileSync(join(publicDir, file), png)
    console.log(`Wrote public/${file} (${size}x${size}, ${png.length} bytes)`)
  }

  // Maskable icon: Android crops to a circle/squircle, so the mark is inset into
  // the safe zone (~80%) and the remainder padded with brand black.
  const maskableSize = 512
  const inner = Math.round(maskableSize * 0.8)
  const pad = Math.round((maskableSize - inner) / 2)
  const maskable = await sharp(svg, { density: 384 })
    .resize(inner, inner, { fit: 'contain', background: { ...BG, alpha: 1 } })
    .flatten({ background: BG })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: BG })
    .png()
    .toBuffer()
  writeFileSync(join(publicDir, 'icon-512-maskable.png'), maskable)
  console.log(`Wrote public/icon-512-maskable.png (512x512, ${maskable.length} bytes)`)

  // favicon.ico — Google fetches /favicon.ico as the fallback for the SERP
  // favicon, and it currently 404s.
  const frames = []
  for (const size of icoSizes) {
    frames.push({ size, png: await render(size).toBuffer() })
  }
  const ico = buildIco(frames)
  writeFileSync(join(publicDir, 'favicon.ico'), ico)
  console.log(`Wrote public/favicon.ico (${icoSizes.join('/')}, ${ico.length} bytes)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
