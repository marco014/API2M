// src/products/infrastructure/adapters/storages/s3FileStorage.ts
import { FileStorage } from "../../../domain/ports/fileStorage";
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

export class S3FileStorage implements FileStorage {
    async uploadFile(file: Express.Multer.File): Promise<string> {
        const localPath = file.path;
        const filekey = `images/${Date.now()}-${file.originalname}`;
        const params ={
            Bucket: 'mymantenimiento',
            Key: filekey,
            Body: fs.createReadStream(localPath),
            ContentType: file.mimetype
        };

        const uploadResult = await s3.upload(params).promise();
        return uploadResult.Location;
    }

    async deleteFile(filePath: string): Promise<void> {
        const filekey = path.basename(filePath);
        await s3.deleteObject({ Bucket: 'mymantenimiento', Key: `images/${filekey}`}).promise();
    }
}