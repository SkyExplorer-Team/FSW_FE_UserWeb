import React, { useState } from "react";
import { Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';



// interface LoginFormData {
//     email: string;
//     password: string;
// }

const Index: React.FC = () => {
    const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const handleContinueWithEmail = () => {
        setIsOnboarding(false);
        console.log("email:", email);
        console.log("password:", password);

    };

    const handleSignIn = () => {
        console.log("Sign In clicked");
        // Implement Sign In logic here
    };

    return (
        <div className="grid grid-cols-2">
            <div className="h-screen flex">
                <img
                    src="src/assets/sign-in.png"
                    alt="Sign In Image"
                    className="w-full rounded p-10 object-contain "
                />
            </div>
            <div className="h-screen flex">
                {isOnboarding ?
                    <div className="self-center ">
                        <h1 className="text-left text-4xl mb-8 font-semibold">
                            Forgot your Password?
                        </h1>
                        <p className="text-neutral-900 text-lg font-normal font-['Plus Jakarta Sans'] leading-7">
                            No worries,we've got you covered!
                        </p>

                        <p className="text-gray-500 text-lg font-normal font-['Plus Jakarta Sans'] leading-7">

                            Enter your email address below, and we'll send you a link to reset your password.
                        </p>
                        <div className="h-10">
                        </div>
                        <Typography.Title style={{ paddingBottom: 0, marginBottom: 0 }} level={5}>Email</Typography.Title>

                        <Input style={{ marginTop: "0.5rem" }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="Enter Your Email"
                        />
                        <div className="h-10">
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={handleContinueWithEmail}

                                type="submit"
                                disabled={false}
                                className="flex w-full  mb-4 justify-center rounded-md active:bg-primary disabled:bg-gray-300 bg-primary hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
                                <p className="p-2">
                                    Send Instruction
                                </p>
                            </button>
                        </div>
                    </div>
                    :
                    <div className="self-center">
                        <div className="self-center ">
                            <h1 className="text-left text-4xl mb-2 font-semibold">
                                Sign in to Your Account
                            </h1>
                            <p className="text-left mb-8 text-lg font-normal">
                                Continue your journey with us.
                            </p>

                            <form className="space-y-6" action="#" method="POST">

                                <Typography.Title style={{ paddingBottom: 0, marginBottom: 0 }} level={5}>Email</Typography.Title>

                                <Input style={{ marginTop: "0.5rem" }}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder="Enter Your Email"
                                />
                                <Typography.Title style={{ paddingBottom: 0, marginBottom: 0 }} level={5}>Password</Typography.Title>
                                <Input.Password
                                    style={{ marginTop: "0.5rem" }}
                                    placeholder="Enter Your Password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />

                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-primary mb-4 hover:text-primary-dark">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="text-base text-[#677084] mb-8 font-normal text-center">
                                    Don't Have an Account?{" "}
                                    <a
                                        type="text"
                                        onClick={handleSignIn}
                                        className="cursor-pointer font-medium text-primary mb-4 hover:text-primary-dark"
                                    >
                                        Sign Up
                                    </a>
                                </div>

                            </form>
                            <div className="h-8"></div>
                            <button
                                onClick={handleContinueWithEmail}
                                type="submit"
                                disabled={
                                    (email == "" || password == "")
                                }
                                className="flex w-full mb-4 justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
                                <p className="p-2">
                                    Sign In
                                </p>
                            </button>
                        </div>

                    </div>}
            </div>
        </div>
    );
};

export default Index;
