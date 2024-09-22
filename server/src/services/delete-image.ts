import { promises as fsPromises } from "node:fs";
import { uploadsFolderPath } from "../utils/uploads-folder-path";
import { BadRequest } from "../.error/BadRequest";
import path from "node:path";

type deleteImageProps = {
    fileName: string;
};

export async function deleteImage(props: deleteImageProps) {
    const { fileName } = props;
    const filePath = path.join(uploadsFolderPath, fileName);

    const fileExists = await fsPromises
        .access(filePath)
        .then(() => true)
        .catch(() => false);

    if (!fileExists) {
        throw new BadRequest("Imagem inexistente");
    }

    await fsPromises.unlink(filePath);
}
