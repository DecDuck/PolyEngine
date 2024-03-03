import mongoose from "mongoose";
import type { Model, SchemaDefinition, SchemaOptions } from 'mongoose'
import { testConnection } from "../s3";


export default defineNitroPlugin(async (app) => {
    if (await testConnection()) {
        console.log(`✔ Connected to S3`)
    }
    if (!process.env.MONGODB) {
        throw new Error("Invalid MONGODB variable.");
    }
    await mongoose.connect(process.env.MONGODB);
    console.log(`✔ Connected to MongoDB`)
})

export function defineMongooseModel<T>(modelName: string, schemaDefinition: SchemaDefinition<T>): Model<T> {
    const schema = new mongoose.Schema<T>(schemaDefinition);
    return mongoose.model<T>(modelName, schema);
}