import * as yup from "yup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const LoginFormValidationSchema = yup.object({
  name: yup.string().optional(),
  email: yup
    .string()
    .required("This field is required.")
    .matches(emailRegex, "Invalid email"),
  password: yup
    .string()
    .required("This field is required.")
    .min(3, "Password should be minimum of 3 characters"),
});
