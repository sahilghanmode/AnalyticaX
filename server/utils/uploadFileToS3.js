import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs"; // If you're uploading from disk
import path from "path";




/**
 * Uploads a file to S3
 * @param {Buffer | ReadableStream} fileBuffer - The file content
 * @param {string} fileName - The name for the file in S3
 * @param {string} mimeType - The file's MIME type
 */
export async function uploadFileToS3(fileBuffer, fileName, mimeType) {
    const s3 = new S3Client({
        region: "ap-south-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
    const uploadParams = {
        Bucket: "excel-analytics",
        Key: `excel/${fileName}`, // Optional folder prefix
        Body: fileBuffer,
        // ContentType: mimeType,
    };

    try {
        const result = await s3.send(new PutObjectCommand(uploadParams));
        console.log("File uploaded successfully:", result);
        return {
            success: true,
            url: `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`,
        };
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        return { success: false, error };
    }
}
