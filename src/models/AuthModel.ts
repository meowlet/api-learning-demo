import { t } from "elysia";

export const SignInBodyModel = t.Object({
  identifier: t.String({
    maxLength: 32,
    minLength: 6,
    error: "Identifier must be between 6 and 32 characters",
  }),
  password: t.String({
    minLength: 8,
    maxLength: 16,
    error: "Password must be between 6 and 32 characters",
  }),
});

export const SignUpBodyModel = t.Object({
  username: t.String({
    maxLength: 32,
    minLength: 6,
    error: "Username must be between 6 and 32 characters",
  }),
  email: t.String({ format: "email", error: "Invalid email format" }),
  password: t.String({
    minLength: 8,
    maxLength: 16,
    pattern:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
    error:
      "Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
  }),
});
