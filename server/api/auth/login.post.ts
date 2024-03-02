import { User } from "~/models/user";
import bcrypt from 'bcrypt';
import { SESSION_SECRET } from "~/server/keys";

export default defineEventHandler(async (h3) => {
    const body: { email?: string, password?: string } = await readBody(h3);
    if (!body.email || !body.password) {
        return createError({
            statusCode: 400,
        });
    }

    const user = await User.findOne({ email: body.email });
    if (!user) {
        return createError({
            statusCode: 403,
        });
    }

    const passwordHash = user.passwordHash as unknown as string;

    const valid = bcrypt.compareSync(body.password, passwordHash);
    if (!valid) {
        return createError({
            statusCode: 403,
        });
    }

    const session = await useSession(h3, {
        password: SESSION_SECRET,
    });

    await session.update({
        userId: user.id
    });

    return {};
})