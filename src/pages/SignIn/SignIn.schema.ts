import * as Yup from "yup";

const schema = Yup.object({
    email: Yup.string()
        .required("Please enter a valid email address.")
        .email("Please enter a valid email address.")
        .max(320, "Email must be at most 320 characters."),

    password: Yup.string()
        .required("Please enter a valid password.")
        .min(8, "Password must be at least 8 characters.")
        .max(12, "Password must be at most 12 characters.")
        .matches(/[a-z]/, "Password must contain a lowercase letter.")
        .matches(/[A-Z]/, "Password must contain an uppercase letter.")
        .matches(/\d/, "Password must contain a number."),

    rememberMe: Yup.array()
        .of(Yup.boolean().oneOf([true]))
        .optional(),
});

export default schema;
