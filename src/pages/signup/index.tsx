import React, { useState, useEffect, useCallback } from "react";
import {
  Steps,
  Button,
  Form,
  Input,
  Modal,
  Typography,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Card,
  Space,
  Alert,
} from "antd";
import { DownOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton";
import { Option } from "antd/es/mentions";
import moment, { Moment } from "moment";
import { FlagIcon } from "react-flag-kit";
import { Rule } from "antd/es/form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import GoogleSvg from "../../assets/google.svg";
import TermsOfUseModal from "../../components/TermsOfUseModal";
import PrivacyPolicyModal from "../../components/PrivacyPolicyModal";

dayjs.extend(customParseFormat);

const { Step } = Steps;
const { Text } = Typography;

interface PersonalFormData {
  salutation: string;
  firstName: string;
  lastName: string;
  nationality: string;
  dob: string;
}

interface ContactFormData {
  email: string;
  phoneNumber: string;
}
interface PasswordFormData {
  password: string;
  confirmPassword: string;
}

interface VerificationFormData {
  verificationCode: string;
}

// Dummy data for nationality options (replace with actual data)
const nationalityOptions = [
  { flag: "🇺🇸", name: "United States", value: "US" },
  { flag: "🇬🇧", name: "United Kingdom", value: "GB" },
  { flag: "🇨🇦", name: "Canada", value: "CA" },
  { flag: "🇦🇺", name: "Australia", value: "AU" },
  { flag: "🇩🇪", name: "Germany", value: "DE" },
  { flag: "🇫🇷", name: "France", value: "FR" },
  { flag: "🇯🇵", name: "Japan", value: "JP" },
  { flag: "🇮🇳", name: "India", value: "IN" },
  { flag: "🇧🇷", name: "Brazil", value: "BR" },
  { flag: "🇮🇩", name: "Indonesia", value: "ID" },
  // Add more nationality options as needed
];

const SignUpPage: React.FC = () => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [termsVisible, setTermsVisible] = useState<boolean>(false);
  const [privacyVisible, setPrivacyVisible] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string | null>(null);
  const [counter, setCounter] = useState<number>(60);
  const [verificationCodeCounter, setVerificationCodeCounter] =
    useState<number>(5);
  const [isNoFirstMiddleNameChecked, setIsNoFirstMiddleNameChecked] =
    useState<boolean>(false);
  const [isNationalityModalVisible, setNationalityModalVisible] =
    useState<boolean>(false);
  const [selectedNationality, setSelectedNationality] = useState<string | null>(
    null
  );
  const [isOtpResend, setIsOtpResend] = useState<boolean>(false);

  // const handleRegister = async () => {
  //   const url = "https://be-java-production.up.railway.app/auth/register/";

  //   const headers = {
  //     "Content-Type": "application/json",
  //   };

  //   const data = {
  //     firstName: personalData.firstName,
  //     lastName: personalData.lastName,
  //     password: passwordData.password,
  //     salutation: personalData.salutation,
  //     email: contactData.email,
  //     national: personalData.nationality,
  //     dob: moment(personalData.dob, "DD MMMM YYYY").format("YYYY-MM-DD"),
  //     phone: contactData.phoneNumber,
  //     subscribe: true,
  //     otpCode: "", // need to generate or handle OTP separately
  //     otpExpireTime: "", // need to set the correct value based on your requirements
  //     resetPasswordToken: "", // need to handle this separately
  //     authProvider: "local",
  //     providerId: "", // need to handle this separately
  //     registrationComplete: true,
  //     otpverified: true,
  //   };

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: headers,
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       console.log("Registration successful!");
  //       // Redirect or perform other actions upon successful registration
  //     } else {
  //       console.error(
  //         `Registration failed with status code: ${response.status}`
  //       );
  //       const errorText = await response.text();
  //       console.error(errorText);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred during registration:", error);
  //   }
  // };

  const handleNext = () => {
    console.log(currentStep);
    if (currentStep === 2) {
      startVerificationCodeCounter();
      setCurrentStep(currentStep + 1);
      // }
      // if (currentStep === 4) {
      //   const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
      //   setVerificationCode(generatedCode);
      //   startCounter();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const [personalInfoForm] = Form.useForm();
  const [contactDetailForm] = Form.useForm();
  const [verificationCodeForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [personalData, setPersonalData] = useState<PersonalFormData>({
    salutation: "",
    firstName: "",
    lastName: "",
    nationality: "",
    dob: "",
  });
  const [contactData, setContactData] = useState<ContactFormData>({
    email: "",
    phoneNumber: "",
  });
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    password: "",
    confirmPassword: "",
  });

  const handlePersonalFormChange =
    (fieldName: keyof PersonalFormData) => (value: string) => {
      setPersonalData({
        ...personalData,
        [fieldName]: value,
      });
    };

  const handleContactFormChange =
    (fieldName: keyof ContactFormData) => (value: string) => {
      setContactData({
        ...contactData,
        [fieldName]: value,
      });
    };
  const handlePasswordFormChange =
    (fieldName: keyof PasswordFormData) => (value: string) => {
      setContactData({
        ...contactData,
        [fieldName]: value,
      });
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
    handleNext();
    if (values.verificationCode === verificationCode) {
      handleNext();
    } else {
      console.error("Verification code mismatch");
    }
  };
  const onPasswordFormFinish = (values: PasswordFormData) => {
    console.log("Password Form values:", values);
    handleNext();
  };

  const startVerificationCodeCounter = useCallback(() => {
    const intervalId = setInterval(() => {
      setVerificationCodeCounter((prevCounter) =>
        prevCounter > 0 ? prevCounter - 1 : 0
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [handleNext]);

  const minutes = Math.floor(verificationCodeCounter / 60);
  const seconds = verificationCodeCounter % 60;

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

  //   Cleanup interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [startCounter]);
  const validateNumber = (
    _: any,
    value: string,
    callback: (error?: string) => void
  ) => {
    const regex = /^[0-9]*$/;
    if (!value || regex.test(value)) {
      callback();
    } else {
      callback("Masukkan hanya angka!");
    }
  };

  const validateFirstName: Rule = ({ getFieldValue }) => ({
    validator(_, value) {
      const noFirstMiddleName = getFieldValue("noFirstMiddleName");

      if (noFirstMiddleName) {
        return Promise.resolve();
      }

      if (!value) {
        return Promise.reject("Please enter your first name.");
      }

      if (/^[A-Za-z\s]+$/.test(value)) {
        return Promise.resolve();
      }

      return Promise.reject("Please enter a valid name with alphabets only.");
    },
  });

  const handleOtpResend = () => {
    console.log("OTP Resend clicked");
    if (!isOtpResend) {
      setVerificationCodeCounter(5);
      setIsOtpResend(true);
      // startVerificationCodeCounter();
    }
  };

  useEffect(() => {
    if (verificationCodeCounter === 0) {
      setIsOtpResend(false);
    }
  }, [verificationCodeCounter]);

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
                className="bg-primary mb-2 font-bold"
                size="large"
                block={true}
              >
                Continue with Email
              </Button>
              <Button
                type="default"
                onClick={handleContinueWithGoogle}
                className="bg-white border-solid border-1 border-neutral-light font-bold flex items-center justify-center"
                size="large"
                block={true}
                icon={
                  <img
                    src={GoogleSvg}
                    alt="My Icon"
                    width="20"
                    height="20"
                    style={{
                      left: "15px",
                      top: "25%",
                      bottom: "25%",
                      position: "absolute",
                    }}
                  />
                }
              >
                Continue with Google
              </Button>
              <div className="text-neutral mb-4">
                Have an account already?{" "}
                <Link
                  type="text"
                  onClick={handleSignIn}
                  className="cursor-pointer text-primary mb-4 left-0"
                  to={""}
                >
                  Sign In
                </Link>
              </div>
              <TermsOfUseModal open={termsVisible} onCancel={handleCancel} />
              <PrivacyPolicyModal
                open={privacyVisible}
                onCancel={handleCancel}
              />
              <Text className="mt-3 text-neutral">
                By continuing, you accept the{" "}
                <span
                  className="font-semibold cursor-pointer underline"
                  onClick={handleTermsClick}
                >
                  Terms Of Use
                </span>{" "}
                and{" "}
                <span
                  className="font-semibold cursor-pointer underline"
                  onClick={handlePrivacyClick}
                >
                  Privacy Policy
                </span>
                .
              </Text>
            </div>
          </div>
        ) : (
          <div className="w-full md:max-w-2xl">
            {currentStep === 3 && (
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
                        className={`${
                          verificationCodeCounter === 0
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
            )}
            {currentStep === 4 && (
              <div className="flex flex-col gap-5">
                <Text className="text-4xl font-semibold">
                  Set your Password
                </Text>
                <div className="flex flex-col">
                  <Text className="text-lg text-neutral">
                    Create strong password to keep your information safe.
                  </Text>
                </div>
                <Form
                  form={passwordForm}
                  onFinish={onPasswordFormFinish}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    label="Password"
                    name="password"
                    className="font-medium mb-5"
                    rules={[
                      { required: true, message: "Please enter your password" },
                      { min: 8, message: "Use at least 8 characters" },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                    help="Use at least 8 characters"
                  >
                    <Input
                      className="font-normal"
                      placeholder="Enter your password"
                      value={passwordData.password}
                      onChange={(e) =>
                        handlePasswordFormChange("password")(e.target.value)
                      }
                      type="password"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Confirm your Password"
                    name="confirmPassword"
                    className="font-medium"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter confirm password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Password did not match!")
                          );
                        },
                      }),
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Input
                      className="font-normal"
                      placeholder="Enter your password"
                      value={personalData.lastName}
                      onChange={(e) =>
                        handlePasswordFormChange("confirmPassword")(
                          e.target.value
                        )
                      }
                      type="password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <SubmitButton form={passwordForm} />
                  </Form.Item>
                </Form>
              </div>
            )}
            {currentStep === 5 && (
              <div className="flex flex-col gap-5">
                <Text className="text-4xl font-semibold">
                  Congratulations! You're Cleared for Takeoff!
                </Text>
                <div className="flex flex-col">
                  <Text className="text-lg text-neutral">
                    Smooth skies ahead! Your account is set up and ready for you
                    to book flights, track your journeys, and unlock exclusive
                    travel perks. Buckle up for a seamless travel experience!
                  </Text>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-primary mb-2 mt-5"
                  size="large"
                  block={true}
                >
                  Sign In
                </Button>
              </div>
            )}
            {currentStep < 3 && (
              <Steps current={currentStep} labelPlacement="vertical">
                <Step title="Personal" />
                <Step title="Contact" />
                <Step title="Check" />
              </Steps>
            )}
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
                  form={personalInfoForm}
                  onFinish={onPersonalFormFinish}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    label="Salutation"
                    name="salutation"
                    className="font-medium mb-5"
                    rules={[
                      { required: true, message: "Please select salutation" },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Select
                      placeholder="Salutation"
                      className="font-normal"
                      value={personalData.salutation}
                      onChange={handlePersonalFormChange("salutation")}
                    >
                      <Option value="Mr">Mr</Option>
                      <Option value="Mrs">Mrs</Option>
                      <Option value="Ms">Ms</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="First & Middle Name"
                    name="firstMiddleName"
                    className="font-medium mb-0"
                    rules={[validateFirstName]}
                  >
                    <Input
                      disabled={isNoFirstMiddleNameChecked}
                      className="font-normal"
                      placeholder="First & Middle Name"
                      value={personalData.firstName}
                      onChange={(e) =>
                        handlePersonalFormChange("firstName")(e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name="noFirstMiddleName"
                    valuePropName="checked"
                    className="mb-5"
                  >
                    <Checkbox
                      className="font-normal"
                      onChange={(e) => {
                        setIsNoFirstMiddleNameChecked(e.target.checked);
                      }}
                    >
                      This passenger doesn’t have a first & middle name in the
                      passport.
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    className="font-medium mb-5"
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
                      value={personalData.lastName}
                      onChange={(e) =>
                        handlePersonalFormChange("lastName")(e.target.value)
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Nationality"
                    name="nationality"
                    className="font-medium mb-5"
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
                      prefix={
                        selectedNationality && (
                          <FlagIcon
                            code={selectedNationality}
                            size={32}
                            className="mr-4 rounded"
                          />
                        )
                      }
                      suffix={<DownOutlined style={{ color: "#d9d9d9" }} />}
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
                      {nationalityOptions.map((option) => (
                        <Card className="w-100" key={option.value}>
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row">
                              <FlagIcon
                                code={option.value}
                                size={32}
                                className="mr-4 rounded"
                              />
                              {option.name}
                            </div>
                            <Radio
                              checked={option.value === selectedNationality}
                              onClick={() => {
                                setSelectedNationality(option.value); // Only set the value, not the object
                                setNationalityModalVisible(false);
                                personalInfoForm.setFieldsValue({
                                  nationality: option.value,
                                }); // Update form field
                                setPersonalData({
                                  ...personalData,
                                  nationality: option.value,
                                });
                              }}
                            ></Radio>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Modal>

                  <Form.Item
                    label="Date of Birth"
                    name="dob"
                    className="font-medium mb-5"
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
                      className="font-normal"
                      style={{ width: "100%" }}
                      disabledDate={(currentDate) =>
                        currentDate && currentDate >= moment().endOf("day")
                      }
                      onChange={(currentDate) =>
                        handlePersonalFormChange("dob")(
                          currentDate!.format("DD MMMM YYYY").toString()
                        )
                      }
                      format={"DD MMMM YYYY"}
                    />
                  </Form.Item>
                  <Form.Item>
                    <SubmitButton form={personalInfoForm} />
                  </Form.Item>
                </Form>
              </div>
            )}
            {currentStep === 1 && (
              <div className="flex flex-col gap-4 pt-10">
                <Text className="text-4xl font-semibold">Contact Detail</Text>
                <Text className="text-lg mb-8">
                  Provide us with your most recent contact information.
                </Text>
                <Form
                  onFinish={onContactFormFinish}
                  layout="vertical"
                  form={contactDetailForm}
                >
                  <Form.Item
                    label="Phone Number"
                    className="font-semibold mb-5"
                    style={{ marginBottom: 0 }}
                  >
                    <Form.Item
                      name="locale"
                      rules={[{ required: false }]}
                      style={{
                        display: "inline-block",
                        width: "18%",
                        marginRight: "2%",
                      }}
                    >
                      <Input
                        defaultValue="+62"
                        readOnly={true}
                        size="large"
                        suffix={
                          <FlagIcon code={"ID"} size={28} className="rounded" />
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      rules={[
                        { required: true },
                        {
                          pattern: /^[0-9]*$/,
                          message: "Please enter a valid phone number",
                        },
                        {
                          min: 6,
                          message:
                            "Invalid phone number length. Please enter a valid phone number with at least 8 digits",
                        },
                      ]}
                      style={{
                        display: "inline-block",
                        width: "80%",
                      }}
                      className=" mb-5"
                    >
                      <Input
                        size="large"
                        placeholder="Phone Number"
                        onChange={(e) =>
                          handleContactFormChange("phoneNumber")(
                            "+62" + e.target.value
                          )
                        }
                      />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    className="font-semibold"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      {
                        type: "email",
                        message: "Please enter a valid email address",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      onChange={(e) =>
                        handleContactFormChange("email")(e.target.value)
                      }
                      className="mb-5"
                    />
                  </Form.Item>
                  <Form.Item>
                    <SubmitButton form={contactDetailForm} />
                  </Form.Item>
                </Form>
              </div>
            )}
            {currentStep === 2 && (
              <div className="flex flex-col gap-4 pt-10">
                <Text className="text-4xl font-semibold">Double Check</Text>
                <Text className="text-lg mb-8">
                  Almost there! Ensure all your details are accurate before
                  hitting the submit button.
                </Text>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between items-center">
                    <Text className="font-semibold text-xl">
                      Personal Information
                    </Text>
                    <div className="flex flex-row items-center gap-2">
                      <Text className="font-bold text-primary">Edit</Text>
                      <EditOutlined className="text-primary" />
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-col w-1/2">
                      <Text className="text-neutral">First & Middle Name</Text>
                      <Text>{personalData.firstName}</Text>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <Text className="text-neutral">Last Name</Text>
                      <Text>{personalData.lastName}</Text>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0">
                    <Text className="text-neutral">Date of Birth</Text>
                    <Text>{personalData.dob}</Text>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-3">
                  <div className="flex flex-row justify-between items-center">
                    <Text className="font-semibold text-xl">
                      Contact Detail
                    </Text>
                    <div className="flex flex-row items-center gap-2">
                      <Text className="font-bold text-primary">Edit</Text>
                      <EditOutlined className="text-primary" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <Text className="text-neutral">Email</Text>
                      <Text>{contactData.email}</Text>
                    </div>
                    <div className="flex flex-col">
                      <Text className="text-neutral">Phone Number</Text>
                      <Text>{contactData.phoneNumber}</Text>
                    </div>
                  </div>
                </div>
                <Checkbox
                  className="font-normal my-2"
                  onChange={(e) => {
                    setIsNoFirstMiddleNameChecked(e.target.checked);
                  }}
                >
                  Subscribe to newsletter to receive latest offer and promotion
                  every month.
                </Checkbox>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-primary mb-2"
                  size="large"
                  block={true}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
