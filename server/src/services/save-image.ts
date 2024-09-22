import type { MultipartFile } from "@fastify/multipart";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { BadRequest } from "../.error/BadRequest";
import { promises as fsPromises } from "node:fs";
import { uploadsFolderPath } from "../utils/uploads-folder-path";

type saveImageProps = {
    image: MultipartFile;
};

export async function saveImage(props: saveImageProps) {
    const { image } = props;
    const uuid = randomUUID();
    const fileMimeType = image.mimetype.replace(/.*\//, ".");
    const fileName = `${uuid}${fileMimeType}`;

    try {
        const filePath = path.join(uploadsFolderPath, fileName);

        await fsPromises.mkdir(uploadsFolderPath, { recursive: true });

        const fileData = await image.toBuffer();

        await fsPromises.writeFile(filePath, fileData);

        const folderDirectory = await fsPromises.open(filePath, "r+"); // Open the file for reading and writing
        await folderDirectory.sync(); // Synchronize the file to disk
        await folderDirectory.close(); // Close the file descriptor

        return fileName;
    } catch (error) {
        throw new BadRequest("Erro ao salvar imagem");
    }
}
