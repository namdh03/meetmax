import * as Yup from "yup";

const schema = Yup.object({
    email: Yup.string()
        .required("Please enter a valid email address.")
        .email("Please enter a valid email address."),
});
export default schema;
