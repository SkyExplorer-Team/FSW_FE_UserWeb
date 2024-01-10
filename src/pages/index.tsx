import React, { useState } from "react";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import ButtonComponent from "../components/ButtonComponent";


const Index: React.FC = () => {
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
                        <p className="text-center mb-4">
                            Ready to Fly? Sign in to access your account and manage your bookings.
                        </p>
                        <div className="flex flex-col items-center">
                            <ButtonComponent onClick={() => { }} type="primary" >
                                Text
                            </ButtonComponent>
                            <Button
                                type="primary"
                                onClick={handleContinueWithEmail}
                                className="mb-4 bg-primary"
                            >
                                Continue with Email
                            </Button>
                            <Button
                                type="default"
                                onClick={handleContinueWithGoogle}
                                className="mb-4 bg-white border-solid border-1 border-neutral-light"
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
                    :
                    <div></div>}
            </div>
        </div>
    );
};

export default Index;
