import Elysia from "elysia";
import { SignInBodyModel, SignUpBodyModel } from "../models/AuthModel";
import { database } from "../database/MongoDB";
import { DatabaseConstant } from "../common/DatabaseConstant";
import jwt from "jsonwebtoken";
import { SuccessRes } from "../common/response/ApiResponse";

const userTable = database.collection(DatabaseConstant.USER_COLLECTION);

export const AuthController = new Elysia({
  prefix: "/auth",
})
  .post(
    "/sign-up",
    async ({ body }) => {
      const user = await userTable.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });

      if (user) {
        throw Error("User exists");
      }

      await userTable.insertOne({
        ...body,
        password: await Bun.password.hash(body.password),
      });

      return SuccessRes("Successfully signed up", null);
    },
    {
      body: SignUpBodyModel,
    },
  )
  .post(
    "/sign-in",
    async ({ body }) => {
      const user = await userTable.findOne({
        $or: [{ username: body.identifier }, { email: body.identifier }],
      });

      if (!user) {
        throw Error("User not found");
      }

      const isMatch = await Bun.password.verify(body.password, user?.password);
      if (!isMatch) {
        throw Error("Password does not match");
      }

      const accessToken = jwt.sign(
        { sub: user._id },
        Bun.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        },
      );

      return SuccessRes("Signed in successfully", {
        accessToken: accessToken,
      });
    },
    { body: SignInBodyModel },
  );
