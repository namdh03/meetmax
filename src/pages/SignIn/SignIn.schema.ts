import * as Yup from "yup";

const schema = Yup.object({
    email: Yup.string()
        .required("Email is required")
        .email("Email invalid")
        .max(320, "Email must be at most 320 characters"),

    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(12, "Password must be at most 12 characters")
        .matches(/[a-z]/, "Password must contain a lowercase letter")
        .matches(/[A-Z]/, "Password must contain an uppercase letter")
        .matches(/\d/, "Password must contain a number"),

});

export default schema;
