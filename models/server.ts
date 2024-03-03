import { defineMongooseModel } from "~/server/plugins/db";

export const Server = defineMongooseModel('Server', {
    name: {
        type: String,
        required: true,
    },
    packs: {
        type: Array,
        of: String,
        required: true
    },
    accessId: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});