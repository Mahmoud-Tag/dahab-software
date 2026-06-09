import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with environment variables
// Ensure these variables are set in your .env file:
// CLOUDINARY_CLOUD_NAME
// CLOUDINARY_API_KEY
// CLOUDINARY_API_SECRET
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(
  file: File,
  filename: string
): Promise<{ url: string; publicId: string }> {
  const buffer = Buffer.from(await file.arrayBuffer())
  
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'dahab-projects',
        public_id: `${Date.now()}-${filename.replace(/[^a-zA-Z0-9_-]/g, '')}`,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error)
          reject(new Error('Failed to upload image to Cloudinary'))
        } else if (result) {
          resolve({ url: result.secure_url, publicId: result.public_id })
        } else {
          reject(new Error('Unknown upload error'))
        }
      }
    )
    
    uploadStream.end(buffer)
  })
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  if (!publicId) return

  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Cloudinary delete error:', error)
  }
}
