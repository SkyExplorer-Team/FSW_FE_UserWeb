import React, { useState } from "react";
import { Alert, Form, Input, Typography } from "antd";
import SubmitButton from "../../components/SubmitButton";

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

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

const Index: React.FC = () => {
    const [isOnboarding, setIsOnboarding] = useState<boolean>(true);

    const [disabledSave, setDisabledSave] = useState(true);


    const [email, setEmail] = useState<{
        value: string;
        validateStatus?: ValidateStatus;
        errorMsg?: string | null;
    }>({ value: "" });

    const onEmailChange = (value: string) => {

        const { validateStatus, errorMsg } = validateEmail(value);

        if (validateStatus === "success") {
            setDisabledSave(false)
        } else {
            setDisabledSave(true)
        }
        setEmail({
            value,
            validateStatus,
            errorMsg,
        });


    };

    const handleContinueWithEmail = () => {
        setIsOnboarding(false);
        console.log("email:", email);

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
                            <div className="h-10">
                            </div>
                            <Form.Item shouldUpdate>
                                <div className="flex flex-col items-center">
                                    <button
                                        onClick={handleContinueWithEmail}
                                        type="submit"
                                        disabled={disabledSave}
                                        className="flex w-full  mb-4 justify-center rounded-md active:bg-primary disabled:bg-gray-300 bg-primary hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
                                        <p className="p-2">
                                            Send Instruction
                                        </p>
                                    </button>
                                </div>
                            </Form.Item>
                        </Form>

                    </div>
                    :
                    
                    <div className="flex flex-col gap-5">
                {isOtpResend && (
                  <Alert
                    message={
                      <Text
                        className="font-semibold"
                        style={{ color: "#247535" }}
                      >
                        OTP Resent Successfully
                      </Text>
                    }
                    description={
                      <Text style={{ color: "#247535" }}>
                        We've resent the OTP code. Please check your inbox or
                        messages.
                      </Text>
                    }
                    style={{ color: "#247535" }}
                    type="success"
                    showIcon
                  />
                )}

                <Text className="text-4xl font-semibold">Verify Code</Text>
                <div className="flex flex-col">
                  <Text className="text-lg text-neutral">
                    Enter the verification code we send you on
                  </Text>
                  <Text className="text-lg mb-8">{contactData.email}</Text>
                </div>
                <Form
                  form={verificationCodeForm}
                  onFinish={onVerificationFormFinish}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-4/5">
                      <Space direction="horizontal" size="middle">
                        <Form.Item
                          name="code1"
                          rules={[
                            { required: true, message: "", max: 1, min: 1 },
                          ]}
                        >
                          <Input
                            style={{ height: "72px", textAlign: "center" }}
                            size="large"
                            maxLength={1}
                          />
                        </Form.Item>
                        <Form.Item
                          name="code2"
                          rules={[
                            { required: true, message: "", max: 1, min: 1 },
                          ]}
                        >
                          <Input
                            style={{ height: "72px", textAlign: "center" }}
                            size="large"
                            maxLength={1}
                          />
                        </Form.Item>
                        <Form.Item
                          name="code3"
                          rules={[
                            { required: true, message: "", max: 1, min: 1 },
                          ]}
                        >
                          <Input
                            style={{ height: "72px", textAlign: "center" }}
                            size="large"
                            maxLength={1}
                          />
                        </Form.Item>
                        <Form.Item
                          name="code4"
                          rules={[
                            { required: true, message: "", max: 1, min: 1 },
                          ]}
                        >
                          <Input
                            style={{ height: "72px", textAlign: "center" }}
                            size="large"
                            maxLength={1}
                          />
                        </Form.Item>
                        <Form.Item
                          name="code5"
                          rules={[
                            { required: true, message: "", max: 1, min: 1 },
                          ]}
                        >
                          <Input
                            style={{ height: "72px", textAlign: "center" }}
                            size="large"
                            maxLength={1}
                          />
                        </Form.Item>
                      </Space>
                    </div>
                  </div>
                  <div className="mt-5 mb-10 flex flex-col gap-4 items-center">
                    <div className="flex flex-row">
                      <Text className="text-neutral">Didn’t receive code?</Text>
                      <Text
                        className={`${verificationCodeCounter === 0
                          ? "text-primary"
                          : "text-neutral"
                          } ml-1 font-semibold cursor-pointer`}
                        onClick={handleOtpResend}
                      >
                        Resend
                      </Text>
                    </div>
                    <Text className="text-primary">
                      {String(minutes).padStart(2, "0")}:
                      {String(seconds).padStart(2, "0")}
                    </Text>
                  </div>
                  <Form.Item>
                    <SubmitButton form={verificationCodeForm} />
                  </Form.Item>
                </Form>
              </div>
              }
            </div>
        </div>
    );
};


export default Index;
