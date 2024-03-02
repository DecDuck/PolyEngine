export const SESSION_SECRET = process.env.SESSION ?? "AH-WELL-FUCK-THEY-DIDNT-CHANGE-IT";
export const SALT_ROUNDS = 10;
export const SELF_URL = new URL(process.env.SELF_URL ?? "http://127.0.0.1");
export const MAX_PACKS = parseInt(process.env.MAX_PACKS ?? "NaN") || 6;

console.log(`SELF_URL: ${SELF_URL}, MAX_PACKS: ${MAX_PACKS}`)