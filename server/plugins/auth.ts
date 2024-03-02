import { User } from "~/models/user";
import { SALT_ROUNDS, SESSION_SECRET } from "../keys";
import { hashSync } from "bcrypt";

const whitelist = ["/login", "/api/auth/", "/upload", "/pack.zip", "/about"];

export default defineNitroPlugin(async (app) => {
    const noUsers = await User.find().countDocuments() == 0;
    if (noUsers) {
        await new User({
            email: "admin@example.com",
            passwordHash: hashSync("polyengine", SALT_ROUNDS),
            needsPasswordChange: true,
            isAdmin: true,
        }).save()
    }

    const handler = app.h3App.handler;
    app.h3App.handler = async (h3) => {
        if (whitelist.filter((e) => h3.path.startsWith(e)).length == 0) {
            const session = await useSession(h3, {
                password: SESSION_SECRET,
            });

            if (!session.data.userId) {
                return sendRedirect(h3, '/login');
            }

            const user = await User.findById(session.data.userId);
            if (!user) {
                await session.clear();
                return sendRedirect(h3, '/login');
            }

            h3.context.user = user;
        }

        return await handler(h3);
    }
})