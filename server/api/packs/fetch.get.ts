import { Server } from "~/models/server";
import { Upload } from "~/models/upload";

export default defineEventHandler(async (h3) => {
    const query = getQuery(h3);
    const serverIdsRaw = (Array.isArray(query.servers) ? query.servers : [query.servers]).filter((e) => e);
    if (serverIdsRaw.length == 0) {
        return createError({ statusCode: 400 });
    }
    const serverIds = serverIdsRaw.map((e) => e.split(',')).flat();

    const servers = (await Promise.all(serverIds.map(async (e) => await Server.findById(e))))
        .filter((e) => e?.owner == h3.context.user.id);

    const packs = (await Promise.all(servers.map(async (m) => await Upload.find({ "metadata.serverId": m?.id })))).flat()
        .map((pack) => {
            const metadata = pack.metadata as unknown as Map<string, string>;
            const server = servers.filter((e) => e?.id.toString() == metadata.get("serverId"))[0];
            // @ts-ignore
            return Object.assign({}, pack._doc, { server: server })
        })
        .sort((a, b) => {
            const aTime = parseInt((a.metadata as unknown as Map<string, string>).get("uploaded") ?? "0");
            const bTime = parseInt((b.metadata as unknown as Map<string, string>).get("uploaded") ?? "0");
            return bTime - aTime;
        });

    return packs;
});