import { SESSION_SECRET } from "~/server/keys";

export default defineEventHandler(async (h3) => {
    const session = await useSession(h3, {
        password: SESSION_SECRET,
    });

    await session.clear();

    return sendRedirect(h3, '/login')
})