import { Server } from "~/models/server";
import { Upload } from "~/models/upload";
import { deleteUpload } from "~/server/s3";

export default defineEventHandler(async (h3) => {
    const id = h3.context.params?.id;
    if (!id) {
        return createError({ statusCode: 400 });
    }
    const server = await Server.findById(id);
    if (!server) {
        return createError({ statusCode: 404 });
    }

    if (server.owner != h3.context.user.id) {
        return createError({ statusCode: 403 });
    }

    const packs = server.packs as unknown as string[];
    for (let i = 0; i < packs.length; i++) {
        const upload = await Upload.findOne({ objId: packs[i] });
        if (!upload) {
            continue;
        }
        await deleteUpload(upload);
    }

    await Server.deleteOne({ _id: server.id });
    return {};
});