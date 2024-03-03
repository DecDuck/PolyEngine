import { defineMongooseModel } from "~/server/plugins/db";

export const User = defineMongooseModel('User', {
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
    }
})