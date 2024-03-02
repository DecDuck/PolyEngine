import { hashSync } from "bcrypt";
import { SALT_ROUNDS } from "~/server/keys";

export default defineEventHandler(async (h3) => {
    const body = await readBody(h3);

    if(body.email){
        h3.context.user.email = body.email;
    }

    if(body.password){
        const password = hashSync(body.password, SALT_ROUNDS);
        h3.context.user.passwordHash = password;
        h3.context.user.needsPasswordChange = false;
    }

    await h3.context.user.save();
    return {};
})