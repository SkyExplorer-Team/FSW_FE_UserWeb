import React, { useState} from "react";
import { Button} from "antd";
import { GoogleOutlined } from "@ant-design/icons";


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
        <div className="w-full">
            <div className="w-1/2">
                <img
                    src="src/assets/sign-in.png"
                    alt="Sign In Image"
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
                    <div></div>
                                )}
            </div>
        </div>
    );
};

export default SignInPage;
