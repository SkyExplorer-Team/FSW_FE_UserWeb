import React, { useState, useEffect, useCallback } from "react";
import { Steps, Button, Form, Input, Modal, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

const { Step } = Steps;
const { Text } = Typography;

interface PersonalFormData {
    name: string;
}

interface ContactFormData {
    email: string;
}

interface VerificationFormData {
    verificationCode: string;
}

const SignInPage: React.FC = () => {
    const [isOnboarding, setIsOnboarding] = useState<boolean>(true);

    const handleContinueWithGoogle = () => {
        console.log("Continue with Google clicked");
        // Implement Google authentication logic here
    };

    const handleContinueWithEmail = () => {
        setIsOnboarding(false);
    };

    const handleSignIn = () => {
        console.log("Sign In clicked");
        // Implement Sign In logic here
    };

    return (
        <div className="flex">
            <div className="w-1/2">
                <img
                    src="src/assets/sign-up.png"
                    alt="Sign Up Image"
                    className="w-full mb-4 md:mb-20"
                />
            </div>
            <div className="w-1/2 p-8">
                {isOnboarding ? (
                    <div className="flex flex-col items-center">
                        <p className="md:w-2/3 text-center mb-4">
                            Ready to Fly? Sign in to access your account and manage your bookings.
                        </p>
                        <div className="md:w-2/3 flex flex-col items-center">
                            <Button
                                type="primary"
                                onClick={handleContinueWithEmail}
                                className="mb-4 md:mb-10 bg-primary"
                            >
                                Continue with Email
                            </Button>
                            <Button
                                type="default"
                                onClick={handleContinueWithGoogle}
                                className="mb-4 md:mb-10 bg-white border-solid border-1 border-neutral-light"
                            >
                                <GoogleOutlined style={{ marginRight: "8px" }} />
                                Continue with Google
                            </Button>
                            <div>
                                Have an account already?{" "}
                                <Button
                                    type="text"
                                    onClick={handleSignIn}
                                    className="cursor-pointer text-primary mb-4"
                                >
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full md:max-w-2xl">
                        <Steps current={currentStep}>
                            <Step title="Personal" />
                            <Step title="Contact" />
                            <Step title="Check" />
                        </Steps>
                        {currentStep === 0 && (
                            <div>
                                {/* dummy form */}
                                <Form onFinish={onPersonalFormFinish} layout="vertical">
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[
                                            { required: true, message: "Please enter your name" },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Next
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        )}
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
                        <Text style={{ marginTop: "10px" }}>
                            By continuing, you accept the
                            <span
                                style={{ color: "#299FD1", cursor: "pointer" }}
                                onClick={handleTermsClick}
                            >
                                {" "}
                                Terms Of Use
                            </span>{" "}
                            and
                            <span
                                style={{ color: "#299FD1", cursor: "pointer" }}
                                onClick={handlePrivacyClick}
                            >
                                {" "}
                                Privacy Policy
                            </span>
                            .
                        </Text>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignInPage;
