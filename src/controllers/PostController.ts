import Elysia from "elysia";
import { database } from "../database/MongoDB";
import { DatabaseConstant } from "../common/DatabaseConstant";
import { AuthPlugin } from "../plugin/AuthPlugin";
import { ObjectId } from "mongodb";
import { CreatePostModel } from "../models/PostModel";

const postTable = database.collection(DatabaseConstant.POST_COLLECTION);
const userTable = database.collection(DatabaseConstant.USER_COLLECTION);

export const PostController = new Elysia({
  prefix: "/posts",
})
  .get("/", async ({ body }) => {
    return true;
  })
  .use(AuthPlugin)
  .post(
    "/",
    async ({ body, userId }) => {
      const user = await userTable.findOne({
        _id: new ObjectId(userId),
      });
      postTable.insertOne({
        ...body,
        uploader: new ObjectId(user?._id),
      });
    },
    {
      body: CreatePostModel,
    },
  );
