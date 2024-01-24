import React, { useState } from "react";
import {
  Steps,
  Button,
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  Checkbox,
} from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton";
import { Option } from "antd/es/mentions";
import moment, { Moment } from "moment";
import { PersonalFormData, ContactFormData, VerificationFormData } from ".";

export const SignUpPage: React.FC = () => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [termsVisible, setTermsVisible] = useState<boolean>(false);
  const [privacyVisible, setPrivacyVisible] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);
  const [counter, setCounter] = useState<number>(60);
  const [personalInfoSubmittable, setPersonalInfoSubmittable] = useState(false);
  const [isNoFirstMiddleNameChecked, setIsNoFirstMiddleNameChecked] =
    useState<boolean>(false);
  const [isNationalityModalVisible, setNationalityModalVisible] =
    useState<boolean>(false);
  const [selectedNationality, setSelectedNationality] = useState<string | null>(
    null
  );

  const handleNext = () => {
    if (currentStep === 2) {
      const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
      setVerificationCode(generatedCode);
      startCounter();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const [form] = Form.useForm();

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

  // const startCounter = useCallback(() => {
  //   const intervalId = setInterval(() => {
  //     setCounter((prevCounter) => prevCounter - 1);
  //     if (counter === 0) {
  //       clearInterval(intervalId);
  //       setVerificationCode(null);
  //       setCounter(60);
  //       handleNext();
  //     }
  //   }, 1000);
  //   return intervalId;
  // }, [counter, handleNext]);
  // useEffect(() => {
  //   const intervalId = startCounter();
  //   // Cleanup interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [startCounter]);
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="md:w-1/2">
        <img
          src="src/assets/sign-up.png"
          alt="Sign Up Image"
          className="w-screen md:w-full"
        />
      </div>
      <div className="md:w-1/2 flex items-center p-4 md:py-10 md:px-16">
        {isOnboarding ? (
          <div className="w-full flex flex-col gap-4">
            <Text className="text-4xl font-semibold">Create an Account</Text>
            <Text className="text-lg mb-8">
              Join us on the journey! Register now and unlock a world of
              seamless possibilities and exclusive benefits.
            </Text>
            <div className="w-full flex flex-col items-center gap-6">
              <Button
                type="primary"
                onClick={handleContinueWithEmail}
                className="bg-primary mb-2"
                size="large"
                block={true}
              >
                Continue with Email
              </Button>
              <Button
                type="default"
                onClick={handleContinueWithGoogle}
                className="bg-white border-solid border-1 border-neutral-light"
                size="large"
                block={true}
              >
                <GoogleOutlined style={{ marginRight: "8px" }} />
                Continue with Google
              </Button>
              <div className="text-neutral mb-4">
                Have an account already?{" "}
                <Link
                  type="text"
                  onClick={handleSignIn}
                  className="cursor-pointer text-primary mb-4"
                  to={""}
                >
                  Sign In
                </Link>
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
            <Steps current={currentStep} labelPlacement="vertical">
              <Step title="Personal" />
              <Step title="Contact" />
              <Step title="Check" />
            </Steps>
            {currentStep === 0 && (
              <div className="flex flex-col gap-4 pt-10">
                <Text className="text-4xl font-semibold">
                  Personal Information
                </Text>
                <Text className="text-lg mb-8">
                  Join us on the journey! Register now and unlock a world of
                  seamless possibilities and exclusive benefits.
                </Text>
                {/* dummy form */}
                <Form
                  form={form}
                  onFinish={onPersonalFormFinish}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    label="Salutation"
                    name="salutation"
                    className="font-medium"
                    rules={[
                      { required: true, message: "Please select salutation" },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Select placeholder="Salutation" className="font-normal">
                      <Option value="Mr">Mr</Option>
                      <Option value="Mrs">Mrs</Option>
                      <Option value="Ms">Ms</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="First & Middle Name"
                    name="firstMiddleName"
                    className="font-medium"
                    rules={[
                      {
                        required: !isNoFirstMiddleNameChecked,
                        message: "Please enter first & middle name",
                      },
                      {
                        pattern: /^[A-Za-z\s]+$/, // Only allow alphabets and spaces
                        message:
                          "Please enter a valid name with alphabets only",
                      },
                    ]}
                  >
                    <Input
                      disabled={isNoFirstMiddleNameChecked}
                      className="font-normal mb-2"
                      placeholder="First & Middle Name"
                    />
                    <Checkbox
                      className="font-normal"
                      onChange={(e) => {
                        setIsNoFirstMiddleNameChecked(e.target.checked);

                        // Get the current form fields to update rules dynamically
                        const fields = form.getFieldsValue();

                        // Update validation rules for First & Middle Name
                        form.setFields({
                          ...fields, // Preserve existing field values
                          firstMiddleName: {
                            rules: e.target.checked
                              ? []
                              : [
                                  {
                                    required: true,
                                    message: "Please enter first & middle name",
                                  },
                                ],
                          },
                        });
                      }}
                    >
                      This passenger doesn’t have a first & middle name in the
                      passport.
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    className="font-medium"
                    rules={[
                      { required: true, message: "Please enter last name" },
                      {
                        pattern: /^[A-Za-z\s]+$/, // Only allow alphabets and spaces
                        message:
                          "Please enter a valid last name with alphabets only",
                      },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Input
                      className="font-normal"
                      placeholder="Your Last Name"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Nationality"
                    name="nationality"
                    className="font-medium"
                    rules={[
                      { required: true, message: "Please select nationality" },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Input
                      readOnly
                      onClick={() => setNationalityModalVisible(true)}
                      value={selectedNationality || ""}
                      className="font-normal"
                      placeholder="Your Nationality"
                    />
                  </Form.Item>

                  {/* Nationality Modal */}
                  <Modal
                    title="Select your nationality"
                    open={isNationalityModalVisible}
                    footer={null}
                    onCancel={() => setNationalityModalVisible(false)}
                    centered
                  >
                    <div className="flex flex-col gap-5 w-100">
                      <Text>
                        Please select your nationality from the options below
                        for the personal information.
                      </Text>
                      {/* <Radio.Group
                              onChange={(e: RadioChangeEvent) => {
                                const selectedValue = e.target.value;
                                setSelectedNationality(selectedValue); // Only set the value, not the object
                                setNationalityModalVisible(false);
                                form.setFieldsValue({ nationality: selectedValue }); // Update form field
                              }}
                              value={selectedNationality} // Use the selected value directly
                            >
                              <Space direction="vertical" className="!w-100">
                                {nationalityOptions.map((option) => (
                                  <Radio key={option.value} value={option.value}>
                                    <Card className="!w-100">
                                      <span
                                        role="img"
                                        aria-label="flag"
                                        style={{ marginRight: "8px" }}
                                      >
                                        {option.flag}
                                      </span>{" "}
                                      {option.name}
                                    </Card>
                                  </Radio>
                                ))}
                              </Space>
                            </Radio.Group> */}
                      <RadioGroup onChange={this.onChange} horizontal>
                        <RadioButton value="apple">Apple</RadioButton>
                        <RadioButton value="orange">Orange</RadioButton>
                        <RadioButton value="melon">Melon</RadioButton>
                        <ReversedRadioButton value="melon">
                          Melon
                        </ReversedRadioButton>
                      </RadioGroup>
                    </div>
                  </Modal>

                  <Form.Item
                    label="Date of Birth"
                    name="dob"
                    className="font-medium"
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        message: "Please select date of birth",
                      },
                      {
                        validator: (_, value: Moment) => {
                          const selectedDate = value;
                          const today = moment().startOf("day");
                          if (
                            selectedDate.isAfter(today) ||
                            selectedDate.isSame(today)
                          ) {
                            return Promise.reject(
                              "Please select a valid date of birth"
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <DatePicker
                      className="font-normal mb-5"
                      style={{ width: "100%" }}
                      disabledDate={(currentDate) =>
                        currentDate && currentDate >= moment().endOf("day")
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <SubmitButton form={form} />
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
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="bg-primary"
                    >
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
          </div>
        )}
      </div>
    </div>
  );
};
