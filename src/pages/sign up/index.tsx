// src/pages/signup/index.tsx
import React, { useState, useCallback } from "react";
import { Steps, Button, Modal, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
// import { useRecoilState } from "recoil";
// import moment from "moment";
// import Title from "antd/es/typography/Title";

import SignUpForm from "../../components/SignUpForm"; // Import the SignUpForm component

// const { Step } = Steps;
const { Text } = Typography;

const SignUpPage: React.FC = () => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [, setCurrentStep] = useState<number>(0);
  const [termsVisible, setTermsVisible] = useState<boolean>(false);
  const [privacyVisible, setPrivacyVisible] = useState<boolean>(false);

  const handleContinueWithGoogle = () => {
    console.log("Continue with Google clicked");
    // Implement Google authentication logic here
  };

  const handleContinueWithEmail = () => {
    setIsOnboarding(false);
    setCurrentStep(0);
  };

  const handleSignIn = () => {
    // Implement Sign In logic here
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

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 ">
        <img
          src="src/assets/sign-up.png"
          alt="Sign Up Image"
          className="w-full mb-4 md:mb-0 md:ml-20"
        />
      </div>
      <div className="md:w-1/2 p-8">
        {isOnboarding ? (
          <div className="flex flex-col items-center">
            <Text className="md:w-2/3 text-center mb-4">
              Join us on the journey! Register now and unlock a world of
              seamless possibilities and exclusive benefits.
            </Text>
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
                <Text>Have an account already?</Text>{" "}
                <Button
                  type="text"
                  onClick={handleSignIn}
                  className="cursor-pointer text-primary mb-4"
                >
                  Sign In
                </Button>
              </div>
              <Modal
                title="Terms Of Use"
                open={termsVisible}
                onCancel={handleCancel}
                footer={null}
              >
                <Text>This is the content of the Terms Of Use.</Text>
              </Modal>
              <Modal
                title="Privacy Policy"
                open={privacyVisible}
                onCancel={handleCancel}
                footer={null}
              >
                <Text>This is the content of the Privacy Policy.</Text>
              </Modal>
              <Text style={{ marginTop: "10px" }}>
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
        ) : (
          <div className="w-full md:max-w-2xl">
            <SignUpForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
