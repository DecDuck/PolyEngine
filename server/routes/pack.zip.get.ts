import { Upload } from "~/models/upload";
import { download } from "../s3";

export default defineEventHandler(async (h3) => {
    const query = getQuery(h3);
    const id = Array.isArray(query.id) ? query.id[0] : query.id;
    if (!id) {
        return createError({ statusCode: 400 })
    }

    const upload = await Upload.findOne({ objId: id });
    if (!upload) {
        return createError({ statusCode: 403 });
    }

    const response = await download(upload.objId as unknown as string);
    return response;
});