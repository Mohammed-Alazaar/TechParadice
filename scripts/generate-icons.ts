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

const targets: { file: string; size: number }[] = [
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
]

async function main() {
  const svg = readFileSync(join(publicDir, 'favicon.svg'))

  for (const { file, size } of targets) {
    const png = await sharp(svg, { density: 384 })
      .resize(size, size, { fit: 'contain', background: { r: 13, g: 13, b: 13, alpha: 1 } })
      .png()
      .toBuffer()
    writeFileSync(join(publicDir, file), png)
    console.log(`Wrote public/${file} (${size}x${size}, ${png.length} bytes)`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
