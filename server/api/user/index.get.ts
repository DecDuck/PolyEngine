import { User } from "~/models/user";
import { SESSION_SECRET } from "~/server/keys";

export default defineEventHandler(async (h3) => {
    return h3.context.user;
})