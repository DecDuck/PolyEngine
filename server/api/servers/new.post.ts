import { Server } from "~/models/server";

export default defineEventHandler(async (h3) => {
    const body = await readBody(h3);
    if (!body.name) {
        return createError({ statusCode: 400 });
    }

    const server = new Server({ name: body.name, packs: [], accessId: crypto.randomUUID(), owner: h3.context.user.id });
    const newServer = await server.save();

    return { id: newServer.id };
})