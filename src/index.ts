import { Elysia } from "elysia";
import { AuthController } from "./controllers/AuthController";
import { MongoDatabase } from "./database/MongoDB";
import { PostController } from "./controllers/PostController";

new Elysia().use(AuthController).use(PostController).listen(3000);

console.log("The server is running!");
