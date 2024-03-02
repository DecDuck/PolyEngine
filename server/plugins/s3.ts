import { testConnection } from "../s3";

export default defineNitroPlugin(async (app) => {
    if(await testConnection()){
        console.log(`✔ Connected to S3`)
    }
})