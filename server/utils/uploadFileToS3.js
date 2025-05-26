import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * Uploads parsed JSON data to S3
 * @param {Object} jsonData - The parsed JSON data
 * @param {string} originalFileName - Original file name (e.g., "sample.xlsx")
 */
export async function uploadParsedJsonToS3(jsonData, originalFileName) {
    const s3 = new S3Client({
        region: "ap-south-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });

    const jsonString = JSON.stringify(jsonData);
    const fileNameWithoutExt = originalFileName.replace(/\.[^/.]+$/, ""); // "sample"
    const jsonFileName = `${fileNameWithoutExt}.json`;

    const uploadParams = {
        Bucket: "excel-analytics",
        Key: `parsed/${jsonFileName}`,
        Body: jsonString,
        ContentType: "application/json",
    };

    try {
        const result = await s3.send(new PutObjectCommand(uploadParams));
        console.log("JSON uploaded successfully:", result);
        return {
            success: true,
            url: `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`,
        };
    } catch (error) {
        console.error("Error uploading JSON to S3:", error);
        return { success: false, error };
    }
}
