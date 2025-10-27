import Elysia from "elysia";
import jwt from "jsonwebtoken";

export const AuthPlugin = new Elysia().derive(
  { as: "global" },
  async ({ headers }) => {
    const accessToken = headers.authorization?.substring(7);

    if (!accessToken) {
      throw Error("Not signed in");
    }

    const payload = jwt.verify(accessToken, Bun.env.JWT_SECRET as string);

    if (!payload) {
      throw Error("Invalid token");
    }

    return {
      userId: payload.sub as string,
    };
  },
);
