import * as Yup from "yup";

const schema = Yup.object({
    message: Yup.string().min(1).max(10000).required(),
});

export default schema;
