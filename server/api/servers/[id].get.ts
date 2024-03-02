import { Server } from "~/models/server";

export default defineEventHandler(async (h3) => {
    const id = h3.context.params?.id;
    if (!id) {
        return createError({ statusCode: 400 });
    }
    const server = await Server.findById(id);
    if (!server) {
        return createError({ statusCode: 404 });
    }

    if (server.owner != h3.context.user.id) {
        return createError({ statusCode: 403 });
    }

    return server;
});