import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import icons from "@/assets/icons";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Radio from "@/components/Radio";
import configs from "@/configs";
import { generateKeyword, isFirebaseError } from "@/helpers";
import { isDate } from "@/helpers/calendar";
import { setDocument, signUpWithEmail } from "@/services";
import { SignUpFormData } from "@/types";
import { Gender } from "@/utils/enum";

import schema from "./SignUp.schema";

const SignUp = () => {
    const {
        control,
        setValue,
        clearErrors,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<SignUpFormData>({
        mode: "onTouched",
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            fullName: "",
            password: "",
            birthday: undefined,
            gender: Gender.MALE,
        },
    });

    const navigate = useNavigate();

    const handleChangeBirthday = (date: Date) => {
        setValue("birthday", date);

        if (isDate(date)) {
            clearErrors("birthday");
        }
    };

    const handleSignUpWithEmail = async (values: SignUpFormData) => {
        try {
            const { providerId, user } = await signUpWithEmail(
                values.email,
                values.password
            );
            navigate(configs.routes.home);
            toast.success("Sign up successfully!");

            await setDocument(configs.collections.users, user.uid, {
                email: values.email,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                fullName: values.fullName,
                birthday: values.birthday,
                gender: values.gender,
                providerId: providerId,
                bio: null,
                phone: null,
                website: null,
                location: null,
                facebookLink: null,
                twitterLink: null,
                instagramLink: null,
                linkedInLink: null,
                avatarUrl: null,
                avatarName: null,
                coverPhotoUrl: null,
                coverPhotoName: null,
                keywords: generateKeyword(values.fullName),
            });
        } catch (error) {
            if (isFirebaseError(error)) {
                console.log(error.code);
                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <form
                className="auth-form"
                onSubmit={handleSubmit(handleSignUpWithEmail)}
            >
                <div className="auth-form__group">
                    <Input.Email
                        control={control}
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        icon={icons.mail}
                    />
                </div>

                <div className="auth-form__group">
                    <Input.Text
                        control={control}
                        name="fullName"
                        id="fullName"
                        placeholder="Your Name"
                        icon={icons.smile}
                    />
                </div>

                <div className="auth-form__group">
                    <Input.Password
                        control={control}
                        name="password"
                        id="password"
                        placeholder="Create Password"
                        icon={icons.lock}
                    />
                </div>

                <div className="auth-form__group auth-form__group--radio">
                    <div className="auth-form__date-picker">
                        <DatePicker
                            label="Date of birth"
                            position={{
                                x: -219,
                                y: 42,
                            }}
                            errorMsg={errors.birthday?.message}
                            onChanged={handleChangeBirthday}
                        />
                    </div>

                    <div className="auth-form__radio-wrapper">
                        <img
                            src={icons.male}
                            alt="radio-icon"
                            className="icon auth-form__radio-icon"
                        />

                        <div className="auth-form__radio">
                            <Radio
                                control={control}
                                name="gender"
                                id="male"
                                label="Male"
                                value={Gender.MALE}
                            />
                        </div>

                        <div className="auth-form__radio">
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
                    className="auth-form__btn"
                    loading={isSubmitting}
                >
                    Sign Up
                </Button>

                <div className="auth-form__footer">
                    <p className="auth-form__text">Already have an account?</p>
                    <Link
                        to={configs.routes.signIn}
                        className="auth-form__link"
                    >
                        Sign In
                    </Link>
                </div>
            </form>
        </>
    );
};

export default SignUp;
