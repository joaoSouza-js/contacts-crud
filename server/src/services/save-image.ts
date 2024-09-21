import type { MultipartFile } from "@fastify/multipart";
import { closeSync, fsyncSync, openSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { BadRequest } from "../.error/BadRequest";
type saveImageProps = {
    image: MultipartFile;
};

export async function saveImage(props: saveImageProps) {
    const { image } = props;
    const uudi = randomUUID();
    const fileMimeType = image.mimetype.replace(/.*\//, ".");
    const fileName = `${uudi}${fileMimeType}`;

    try {
        const filePath = path.join(__dirname, "../../uploads", fileName);

        console.log(filePath);

        const fileData = await image.toBuffer();

        const folderDirectory = openSync(filePath, "w");
        writeFileSync(folderDirectory, fileData);
        fsyncSync(folderDirectory);
        closeSync(folderDirectory);

        return fileName;
    } catch (error) {
        throw new BadRequest("Erro ao salvar imagem");
    }
}
