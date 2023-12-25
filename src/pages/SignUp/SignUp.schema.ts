import * as Yup from "yup";

import { Gender } from "@/utils/enum";

const schema = Yup.object({
    email: Yup.string()
        .required("Email is required")
        .email("Email invalid")
        .max(320, "Email must be at most 320 characters"),
    fullName: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(12, "Password must be at most 12 characters"),
    birthday: Yup.date().required("Date of birth is required"),
    gender: Yup.mixed<Gender>()
        .oneOf([Gender.MALE, Gender.FEMALE])
        .required("Gender is required"),
});

export default schema;
