import React, { useState } from "react";
import { Form, Input, Typography } from "antd";

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

const validateEmail = (email:string) : {validateStatus : ValidateStatus, errorMsg: string |null} => {
    const res = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (res == null){
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

        if(validateStatus === "success") {
            setDisabledSave(false)
        }else{
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
                                help = {email.errorMsg}
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
                    <div className="self-center">
                        <div className="self-center ">
                            <h1 className="text-left text-4xl mb-2 font-semibold">
                                Sign in to Your Account
                            </h1>
                            <p className="text-left mb-8 text-lg font-normal">
                                Continue your journey with us.
                            </p>

                            <div className="h-8"></div>
                            {/* <button
                                onClick={handleContinueWithEmail}
                                type="submit"
                                disabled={
                                    (email == "" || password == "")
                                }
                                className="flex w-full mb-4 justify-center rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary-dark px-3 py-1.5 text-base font-bold leading-6 text-white shadow-sm">
                                <p className="p-2">
                                    Sign In
                                </p>
                            </button> */}
                        </div>

                    </div>}
            </div>
        </div>
    );
};


export default Index;
