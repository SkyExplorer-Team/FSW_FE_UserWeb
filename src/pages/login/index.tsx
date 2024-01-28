import React, { useState } from "react";
import { Button, Input, Modal, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const endpoint = "/api/user/";
const target = "/login/"
const api_base_url = "be-java-production.up.railway.app/https://be-java-production.up.railway.app"

const SignIn: React.FC = () => {
    const navigate = useNavigate();

    const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
    const [termsVisible, setTermsVisible] = useState<boolean>(false);
    const [privacyVisible, setPrivacyVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const handleContinueWithGoogle = () => {
        console.log("Continue with Google clicked");
        // Implement Google authentication logic here
    };
    const handleContinueWithEmail = () => {
        setIsOnboarding(false);
        console.log("email:", email);
        console.log("password:", password);

    };
    const handleSignUp = () => {
        navigate("/signup")
    };

    const handleTermsClick = () => {
        setTermsVisible(true);
    };

    const handlePrivacyClick = () => {
        setPrivacyVisible(true);
    };
    const handleCancel = () => {
        setTermsVisible(false);
        setPrivacyVisible(false);
    };


    const handleSignIn = async ()  =>  {
        console.log("Sign In clicked");

        const payload= {
            "email": email,
            "password": password
        }

        const response = await fetch(
            api_base_url + endpoint+target,
            {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            }
          );
          const responseJson = await response.json();

          if (response.status !== 200) {
            alert('error: ' + responseJson.message);
          }


          localStorage.setItem(
            'access_token',
            responseJson.data.access_token
          );

          // If login succeed, redirect ke home
          navigate('/dashboard');
        console.log(response)
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
                            Welcome Back!
                        </h1>
                        <p className="text-left mb-4 text-lg">
                            Ready to Fly? Sign in to access your account and manage your bookings.
                        </p>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={handleContinueWithEmail}

                                type="submit"
                                className="flex w-full  mb-4 justify-center rounded-md bg-primary hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
                                <p className="p-2">

                                    Continue with Email
                                </p>
                            </button>


                            <Button
                                type="default"
                                onClick={handleContinueWithGoogle}
                                className="mb-4 w-full bg-white border-solid border-1 border-neutral-light"
                            >

                                <GoogleOutlined style={{ marginRight: "8px" }} />

                                Continue with Google
                            </Button>

                            <div className="text-base text-[#677084] mb-8 font-normal text-center">
                                Don't Have an Account?{" "}
                                <a
                                    type="text"
                                    onClick={handleSignUp}
                                    className="cursor-pointer font-medium text-primary mb-4 hover:text-primary-dark"
                                >
                                    Sign Up
                                </a>
                            </div>

                            <Modal
                                title="Terms Of Use"
                                open={termsVisible}
                                onCancel={handleCancel}
                                footer={null}
                            >
                                <p>This is the content of the Terms Of Use.</p>
                            </Modal>
                            <Modal
                                title="Privacy Policy"
                                open={privacyVisible}
                                onCancel={handleCancel}
                                footer={null}
                            >
                                <p>This is the content of the Privacy Policy.</p>
                            </Modal>

                            <Text className="text-base" style={{ marginTop: "10px" }}>
                                By continuing, you accept the
                                <span
                                    style={{ color: "#38A993", cursor: "pointer" }}
                                    onClick={handleTermsClick}
                                >
                                    {" "}
                                    Terms Of Use
                                </span>{" "}
                                and
                                <span
                                    style={{ color: "#38A993", cursor: "pointer" }}
                                    onClick={handlePrivacyClick}
                                >
                                    {" "}
                                    Privacy Policy
                                </span>
                                .
                            </Text>
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
                                onClick={handleSignIn}
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

export default SignIn;
