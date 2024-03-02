import { defineMongooseModel } from "#nuxt/mongoose";

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
})