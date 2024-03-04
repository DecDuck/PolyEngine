import * as Minio from 'minio';
import { Upload } from "~/models/upload";
import crypto from 'crypto';


const client = new Minio.Client({
    accessKey: process.env.S3_ACCESS_ID ?? "minioadmin",
    secretKey: process.env.S3_ACCESS_KEY ?? "minioadmin",

    endPoint: process.env.S3_ENDPOINT ?? "127.0.0.1",
    port: parseInt(process.env.S3_PORT ?? "nan") || 9000,
    useSSL: process.env.S3_SSL != "false"
});
const BUCKET = process.env.S3_BUCKET ?? "polyengine";
const REGION = process.env.S3_REGION ?? "auto";

export async function testConnection() {
    const exists = await client.bucketExists(BUCKET);
    if (!exists) {
        await client.makeBucket(BUCKET, REGION);
    }
    return true;
}
export async function upload(data: Buffer, metadata: { [key: string]: string }) {
    const packID = crypto.randomUUID();

    const response = await client.putObject(BUCKET, packID, data);
    const uploadObj = new Upload({ objId: packID, metadata: metadata });
    await uploadObj.save();
    return packID;
}
// upload is typeof Upload
export async function deleteUpload(upload: any) {
    const objId = upload.objId;

    const response = await client.removeObject(BUCKET, objId);
    const deleted = await Upload.deleteOne({ _id: upload.id });
    if (deleted.deletedCount != 1) {
        throw "failed to delete upload object";
    };
}
export async function download(key: string) {
    return await client.getObject(BUCKET, key);
}