import { expressjwt } from "express-jwt";

const authMiddleware = expressjwt({ secret: process.env.SECRET_KEY, algorithms: ["HS256"] });

export default authMiddleware;