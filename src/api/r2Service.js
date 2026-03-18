import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Load environment variables
const R2_ACCOUNT_ID = import.meta.env.VITE_R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = import.meta.env.VITE_R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = import.meta.env.VITE_R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = import.meta.env.VITE_R2_BUCKET_NAME;
const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL;

// Validate environment variables
if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME || !R2_PUBLIC_URL) {
  console.error("Missing R2 environment variables");
}

// Initialize S3 client for R2
const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

/**
 * Generate a pre-signed URL for direct client-side upload
 * @param {string} key - The object key (e.g., "news/filename.jpg")
 * @param {string} contentType - MIME type of the file
 * @returns {Promise<string>} Pre-signed URL
 */
export const getUploadUrl = async (key, contentType) => {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });
  return await getSignedUrl(S3, command, { expiresIn: 3600 }); // 1 hour
};

/**
 * Get public URL for an image
 * @param {string} key - The object key
 * @returns {string} Public URL
 */
export const getPublicUrl = (key) => {
  return `${R2_PUBLIC_URL}/${key}`;
};

/**
 * Delete an image from R2
 * @param {string} key - The object key
 */
export const deleteImage = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });
  await S3.send(command);
};