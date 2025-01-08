import * as yup from "yup";
export const NotesValidationSchema = yup.object({
  title: yup
    .string()
    .required("This field is required.")
    .min(3, "Title can't be less than 3 words."),
  description: yup
    .string()
    .required("This field is required.")
    .min(5, "Description can't be less than 5 words."),
});
