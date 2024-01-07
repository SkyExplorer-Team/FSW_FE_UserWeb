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

const SignUpPage: React.FC = () => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [termsVisible, setTermsVisible] = useState<boolean>(false);
  const [privacyVisible, setPrivacyVisible] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);
  const [counter, setCounter] = useState<number>(60);

  const handleNext = () => {
    if (currentStep === 2) {
      const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
      setVerificationCode(generatedCode);
      startCounter();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleContinueWithGoogle = () => {
    console.log("Continue with Google clicked");
    // Implement Google authentication logic here
  };

  const handleContinueWithEmail = () => {
    setIsOnboarding(false);
    setCurrentStep(0);
  };

  const handleSignIn = () => {
    console.log("Sign In clicked");
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

  const onPersonalFormFinish = (values: PersonalFormData) => {
    console.log("Personal Form values:", values);
    handleNext();
  };

  const onContactFormFinish = (values: ContactFormData) => {
    console.log("Contact Form values:", values);
    handleNext();
  };

  const onVerificationFormFinish = (values: VerificationFormData) => {
    console.log("Verification Form values:", values);
    if (values.verificationCode === verificationCode) {
      handleNext();
    } else {
      console.error("Verification code mismatch");
    }
  };

  const startCounter = useCallback(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);

      if (counter === 0) {
        clearInterval(intervalId);
        setVerificationCode(null);
        setCounter(60);
        handleNext();
      }
    }, 1000);

    return intervalId;
  }, [counter, handleNext]);

  useEffect(() => {
    const intervalId = startCounter();

    // Cleanup interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [startCounter]);

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
              Join us on the journey! Register now and unlock a world of
              seamless possibilities and exclusive benefits.
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
            {currentStep === 1 && (
              <div>
                {/* dummy form */}
                <Form onFinish={onContactFormFinish} layout="vertical">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      {
                        type: "email",
                        message: "Please enter a valid email address",
                      },
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
            {currentStep === 2 && (
              <div>
                {/* dummy form */}
                <p>Enter the verification code we send you on </p>
                <Form onFinish={onVerificationFormFinish} layout="vertical">
                  <Form.Item
                    label="Verification Code"
                    name="verificationCode"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the verification code",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Text>Time remaining: {counter} second(s)</Text>
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

export default SignUpPage;
