import React, { useState } from "react";
import { Button, Modal, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Index: React.FC = () => {
    const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
    const [termsVisible, setTermsVisible] = useState<boolean>(false);
    const [privacyVisible, setPrivacyVisible] = useState<boolean>(false);

    const handleContinueWithGoogle = () => {
        console.log("Continue with Google clicked");
        // Implement Google authentication logic here
    };
    const handleContinueWithEmail = () => {
        setIsOnboarding(false);
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
                        {/* //styleName: Display/md/SemiBold;
                    font-family: Plus Jakarta Sans;
                    font-size: 36px;
                    font-weight: 600;
                    line-height: 54px;
                    letter-spacing: 0em;
                    text-align: left; */}

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
                                className="flex w-full mb-4 justify-center rounded-md bg-primary hover:bg-primary-dark px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm">
                                Continue with Email
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
                                    onClick={handleSignIn}
                                    className="cursor-pointer font-medium text-primary mb-4"
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
                    <div></div>}
            </div>
        </div>
    );
};

export default Index;
