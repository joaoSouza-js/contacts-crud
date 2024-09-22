import { promises as fsPromises } from "node:fs";
import { uploadsFolderPath } from "../utils/uploads-folder-path";
import { BadRequest } from "../.error/BadRequest";

type deleteImageProps = {
    fileName: string;
};

export async function deleteImage(props: deleteImageProps) {
    const { fileName } = props;
    const filePath = `${uploadsFolderPath}/${fileName}`;

    const fileExists = await fsPromises
        .access(filePath)
        .then(() => true)
        .catch(() => false);

    if (!fileExists) {
        throw new BadRequest("Imagem inexistente");
    }

    await fsPromises.unlink(fileName);
}
