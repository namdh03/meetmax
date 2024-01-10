import * as Yup from "yup";

const schema = Yup.object({
    message: Yup.string().required(),
});

export default schema;
