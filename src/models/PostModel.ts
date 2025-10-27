import { t } from "elysia";

export const CreatePostModel = t.Object({
  title: t.String({
    maxLength: 128,
    minLength: 8,
    error: "Title must not be too long or too short",
  }),
  content: t.String({
    minLength: 8,
    maxLength: 8192,
    error: "Content must not be too long or too short",
  }),
});
