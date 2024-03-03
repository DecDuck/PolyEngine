import { defineMongooseModel } from "~/server/plugins/db";

export const Upload = defineMongooseModel('Upload', {
    objId: {
        type: String,
        required: true,
    },
    metadata: {
        type: Map,
        of: String,
        required: true
    }
})