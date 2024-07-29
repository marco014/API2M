// src/products//domain/ports/fileStorage.ts
export interface FileStorage {
    uploadFile(file: Express.Multer.File): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
}