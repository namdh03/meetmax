import * as Yup from "yup";

import { Gender } from "@/utils/enum";

const schema = Yup.object({
    email: Yup.string()
        .required("Please enter a valid email address.")
        .email("Please enter a valid email address.")
        .max(320, "Email must be at most 320 characters."),
    fullName: Yup.string()
        .required("Please enter a valid name.")
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name must be at most 50 characters."),
    password: Yup.string()
        .required("Please enter a valid password.")
        .min(8, "Password must be at least 8 characters.")
        .max(12, "Password must be at most 12 characters.")
        .matches(/[a-z]/, "Password must contain a lowercase letter.")
        .matches(/[A-Z]/, "Password must contain an uppercase letter.")
        .matches(/\d/, "Password must contain a number."),
    birthday: Yup.date().required("Please pick your date of birth."),
    gender: Yup.mixed<Gender>()
        .oneOf([Gender.MALE, Gender.FEMALE])
        .required("Please pick your gender."),
});

export default schema;
