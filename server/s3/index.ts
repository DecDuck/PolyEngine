import { S3Client, ListBucketsCommand, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "~/models/upload";

const client = new S3Client({
    endpoint: process.env.S3_ENDPOINT ?? "http://127.0.0.1:9000",
    region: process.env.S3_REGION ?? "auto",
    credentials: {
        accessKeyId: process.env.S3_ACCESS_ID ?? "minioadmin",
        secretAccessKey: process.env.S3_ACCESS_KEY ?? "minioadmin"
    },
});
const BUCKET = process.env.S3_BUCKET ?? "polyengine";

export async function testConnection() {
    await client.send(new ListBucketsCommand({}));
    return true;
}
export async function upload(data: Buffer, metadata: { [key: string]: string }) {
    const packID = crypto.randomUUID();

    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: packID,
        Body: data
    });
    const response = await client.send(command);
    const uploadObj = new Upload({ objId: packID, metadata: metadata });
    await uploadObj.save();
    return packID;
}
// upload is typeof Upload
export async function deleteUpload(upload: any) {
    const objId = upload.objId;
    const command = new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: objId
    });
    const response = await client.send(command);
    const deleted = await Upload.deleteOne({ _id: upload.id });
    if (deleted.deletedCount != 1) {
        throw "failed to delete upload object";
    };
}
export async function download(key: string){
    const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: key
    });
    return await client.send(command);
}