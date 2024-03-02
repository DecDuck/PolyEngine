import { Server } from "~/models/server"

export default defineEventHandler(async (h3) => {
    const servers = await Server.find({ owner: h3.context.user.id }).exec();
    return servers;
})