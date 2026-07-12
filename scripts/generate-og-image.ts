/**
 * Rasterizes the brand OG banner (public/og-image.svg) into public/og-image.png
 * at 1200x630. The PNG is what actually gets referenced by Open Graph, Twitter
 * cards, and the schema.org `logo` fields — social platforms and most crawlers
 * do not render SVG for previews, so a raster copy must exist.
 *
 * Run with: npx tsx scripts/generate-og-image.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const publicDir = join(process.cwd(), 'public')

async function main() {
  const svg = readFileSync(join(publicDir, 'og-image.svg'))

  const png = await sharp(svg, { density: 144 })
    .resize(1200, 630, { fit: 'fill' })
    .png()
    .toBuffer()

  writeFileSync(join(publicDir, 'og-image.png'), png)
  console.log(`Wrote public/og-image.png (${png.length} bytes)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
