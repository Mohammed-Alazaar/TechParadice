import { NextResponse } from 'next/server'
import sharp from 'sharp'
import cloudinary from '@/lib/cloudinary'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const inputBuffer = Buffer.from(arrayBuffer)

  // Compress and convert to WebP (quality 80, max 1920px wide)
  const webpBuffer = await sharp(inputBuffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer()

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: 'techparadice', format: 'webp', resource_type: 'image' },
        (err, result) => {
          if (err || !result) return reject(err)
          resolve(result as { secure_url: string })
        }
      )
      .end(webpBuffer)
  })

  return NextResponse.json({ url: result.secure_url })
}
