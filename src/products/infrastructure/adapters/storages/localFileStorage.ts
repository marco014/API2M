// src/products/infrastructure/adapters/storages/localFileStorage.ts
import { FileStorage } from "../../../domain/ports/fileStorage";
import multer from "multer";
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueSuffix);
    }
});

const multerConfig: multer.Options = {
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB
    }
};

const uploadMiddleware = multer(multerConfig).single('image');

export const upload = (req: Request, res: Response, next: NextFunction) => {
    uploadMiddleware(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer Error:', err);
            return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
            console.error('Unknown Error:', err);
            return res.status(500).json({ error: `Unknown error: ${err.message}` });
        }
        console.log('Archivo recibido en Multer:', req.file);
        next();
    });
};

export class LocalFileStorage implements FileStorage {
    async uploadFile(file: Express.Multer.File): Promise<string> {
        return file.path;
    }

    async deleteFile(filePath: string): Promise<void> {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            console.warn(`El archivo ${filePath} no existe`);
        }
    }
}
