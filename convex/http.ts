import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./betterAuth/auth";

const http = httpRouter();

// Register the Better Auth HTTP routes
authComponent.registerRoutesLazy(http, createAuth, { cors: true });

export default http;
