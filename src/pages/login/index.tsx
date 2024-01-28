import React, { useState } from "react";
import { Button, Form, Input, Modal, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { ValidateStatus } from "antd/lib/form/FormItem";

const { Text } = Typography;
const endpoint = "/api/user/";
const target = "/login/"
const api_base_url = "https://be-java-production.up.railway.app"

const SignIn: React.FC = () => {
    const navigate = useNavigate();

    const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
    const [termsVisible, setTermsVisible] = useState<boolean>(false);
    const [privacyVisible, setPrivacyVisible] = useState<boolean>(false);
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const [disabledLogin, setDisabledLogin] = useState(true);

    const validateEmail = (email: string): { validateStatus: ValidateStatus, errorMsg: string | null } => {
        const res = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (res == null) {
            return {
                validateStatus: "error",
                errorMsg: "Please enter a valid email address"
            }
        }
        return {
            validateStatus: "success",
            errorMsg: null
        }

    };

    const [email, setEmail] = useState<{
        value: string;
        validateStatus?: ValidateStatus;
        errorMsg?: string | null;
    }>({ value: "" });


    const onEmailChange = (value: string) => {

        const { validateStatus, errorMsg } = validateEmail(value);

        if (validateStatus === "success") {
            setDisabledLogin(false)
        } else {
            setDisabledLogin(true)
        }
        setEmail({
            value,
            validateStatus,
            errorMsg,
        });


    };

    const handleSignUp = () => {
        navigate("/signup")
    };
    const handleForget = () => {
        navigate("/forget")
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


    const handleSignIn = async () => {
        const payload = {
            "email": email.value,
            "password": password
        }
        const response = await fetch(
            api_base_url + endpoint + target,
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );
        console.log(response)
        const responseJson = await response.json();

        if (response.status !== 200) {
            alert('error: ' + responseJson.message);
            showModal()
            return;
        }

        localStorage.setItem(
            'access_token',
            responseJson.data.token
        );


        // If login succeed, redirect ke home
        navigate('/dashboard');
        console.log(response)
    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="h-screen w-1/2">
                <img
                    src="src/assets/sign-in.png"
                    alt="Sign In Image"
                    className="h-full rounded p-10 object-contain "
                />
            </div>
            <div className="md:w-1/2 flex items-center p-4 md:py-10 md:px-16">
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


                            <Form>
                                <Form.Item
                                    validateStatus={email.validateStatus}
                                    help={email.errorMsg}
                                >
                                    <Typography.Title style={{ paddingBottom: 0, marginBottom: 0 }} level={5}>Email</Typography.Title>
                                    <Input style={{ marginTop: "0.5rem" }}
                                        onChange={(e) => {
                                            onEmailChange(e.target.value);

                                        }}
                                        placeholder="Enter Your Email"
                                    />
                                </Form.Item>
                                <Form.Item
                                >
                                    <Typography.Title style={{ paddingBottom: 0, marginBottom: 0 }} level={5}>Password</Typography.Title>
                                    <Input.Password
                                        style={{ marginTop: "0.5rem" }}
                                        placeholder="Enter Your Password"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                </Form.Item>
                                <div className="text-sm">
                                    <a onClick={handleForget} className="font-semibold text-primary mb-4 hover:text-primary-dark">
                                        Forgot password?
                                    </a>
                                </div>
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

                                <Form.Item shouldUpdate>
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={handleSignIn}
                                            type="submit"
                                            disabled={
                                                disabledLogin && password == ""
                                            }
                                            className="flex w-full mb-4 justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
                                            <p className="p-2">
                                                Sign In
                                            </p>
                                        </button>
                                    </div>
                                </Form.Item>
                            </Form>

                            <Modal
                                open={isModalOpen}
                                title="Account Not Found"
                                footer={[
                                    <button
                                        onClick={handleOk}
                                        type="submit"
                                        className="flex mb-4 justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
                                        <p className="p-2">
                                            Use Another Email
                                        </p>
                                    </button>,
                                    <button
                                        onClick={handleSignUp}
                                        type="submit"
                                        className="flex mb-4 justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
                                        <p className="p-2">
                                            Go to Sign Up
                                        </p>
                                    </button>,
                                ]}
                            >
                                <p className="text-neutral-900 text-base font-normal font-['Plus Jakarta Sans'] leading-normal">This SkyEskplorer account doesn’t exist. Enter a different account or Sign Up to create a new one.</p>
                            </Modal>
                        </div>

                    </div>}
            </div>
        </div>
    );
};

export default SignIn;
