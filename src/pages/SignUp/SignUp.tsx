import { useState } from "react";

import { useAuth } from "@/hooks";
import { signInWithEmail, signOutSystem, signUpWithEmail } from "@/services";

const SignUp = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSignIn = async () => {
        try {
            await signInWithEmail(formData.email, formData.password);

            console.log("User signed in successfully");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignUp = async () => {
        try {
            await signUpWithEmail(formData.email, formData.password);

            console.log("User created successfully");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOutSystem();
            console.log("Sign out");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>{user?.email}</h1>

            <form action="">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value,
                        })
                    }
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            password: e.target.value,
                        })
                    }
                />
                <button type="button" onClick={handleSignUp}>
                    Sign Up
                </button>
            </form>

            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default SignUp;
