import { Server } from "~/models/server";
import { deleteUpload, upload } from "../s3";
import { MAX_PACKS, SELF_URL } from "../keys";
import crypto from 'crypto';
import { ServerSideEncryption } from "@aws-sdk/client-s3";
import { Upload } from "~/models/upload";

export default defineEventHandler(async (h3) => {
    const body = await readMultipartFormData(h3);
    if (!body) {
        return createError({ statusCode: 400 });
    }

    // Extract ID
    const ids = body.filter((e) => e.name == "id");
    if (ids.length != 1) {
        return createError({ statusCode: 400 });
    }
    const id = ids[0].data.toString();

    // Find server connected with ID
    const server = await Server.findOne({ accessId: id });
    if (!server) {
        return createError({ statusCode: 403 });
    }
    const serverPacks = server.packs as unknown as string[];

    // If it's a valid access id, upload file
    const packs = body.filter((e) => e.name == "pack");
    if (packs.length != 1) {
        return createError({ statusCode: 400 });
    }
    const pack = packs[0];

    if (serverPacks.length >= MAX_PACKS) {
        const deadPackID = serverPacks.shift();
        const upload = await Upload.findOne({ objId: deadPackID });
        if (upload) {
            await deleteUpload(upload);
        }
    }


    const sha1 = crypto.createHash('sha1');
    sha1.update(pack.data);
    const hash = sha1.digest('hex');

    const packID = await upload(pack.data, { uploaded: Date.now().toString(), serverId: server.id });
    const url = SELF_URL.toString() + `pack.zip?id=${packID}`;

    serverPacks.push(packID);

    server.packs = serverPacks as unknown as ArrayConstructor;
    await server.save();
    return {
        url,
        sha1: hash
    }
})