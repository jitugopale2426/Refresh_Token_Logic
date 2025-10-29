import express from "express";
import authRouter from "./auth.js";
import { PrismaClient } from "@prisma/client";

const rootRouter = express.Router();

export const prismaClient = new PrismaClient({
    log:['query']
});

rootRouter.use("/auth",authRouter)

export default rootRouter;