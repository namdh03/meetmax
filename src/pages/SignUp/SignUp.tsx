import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import icons from "@/assets/icons";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Radio from "@/components/Radio";
import configs from "@/configs";
import { SignUpFormData } from "@/types";
import { Gender } from "@/utils/enum";

import schema from "./SignUp.schema";

const SignUp = () => {
    const {
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<SignUpFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            full_name: "",
            password: "",
            birthday: undefined,
            gender: Gender.MALE,
        },
    });

    console.log(errors);

    const handleSignIn = async (values: SignUpFormData) => {
        try {
            console.log(values);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="auth__form" onSubmit={handleSubmit(handleSignIn)}>
            <div className="auth__form-group">
                <Input.Email
                    control={control}
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    icon={icons.mail}
                />
            </div>

            <div className="auth__form-group">
                <Input.Text
                    control={control}
                    name="full_name"
                    id="full_name"
                    placeholder="Your Name"
                    icon={icons.smile}
                />
            </div>

            <div className="auth__form-group">
                <Input.Password
                    control={control}
                    name="password"
                    id="password"
                    placeholder="Create Password"
                    icon={icons.lock}
                />
            </div>

            <div className="auth__form-wrapper">
                <DatePicker
                    label="Date of birth"
                    position={{
                        x: -219,
                        y: 42,
                    }}
                    onChanged={(date) => setValue("birthday", date)}
                />

                <div className="auth__form-radio">
                    <img
                        src={icons.male}
                        alt="radio-icon"
                        className="auth__form-icon"
                    />

                    <div className="auth__form-radio-group">
                        <Radio
                            control={control}
                            name="gender"
                            id="male"
                            label="Male"
                            value={Gender.MALE}
                        />
                    </div>
                    <div className="auth__form-radio-group">
                        <Radio
                            control={control}
                            name="gender"
                            id="female"
                            label="Female"
                            value={Gender.FEMALE}
                        />
                    </div>
                </div>
            </div>

            <Button
                variant="primary"
                className="auth__form-btn"
                loading={isSubmitting}
            >
                Sign In
            </Button>

            <div className="auth__form-footer">
                <p className="auth__form-text">Already have an account?</p>
                <Link to={configs.routes.signIn} className="auth__form-link">
                    Sign In
                </Link>
            </div>
        </form>
    );
};

export default SignUp;
