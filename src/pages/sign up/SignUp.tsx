import React, { useState, useEffect, useCallback } from "react";
import {
  Steps,
  Button,
  Form,
  Input,
  Modal,
  Typography,
  Select,
  Checkbox,
  DatePicker,
  Radio,
  RadioChangeEvent,
} from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import {
  personalDataAtom,
  contactDataAtom,
  verificationDataAtom,
  VerificationFormData,
  ContactFormData,
  PersonalFormData,
} from "../../atoms/SignUpAtoms";

const { Step } = Steps;
const { Text } = Typography;
const { Option } = Select;

// Dummy data for nationality options (replace with actual data)
const nationalityOptions = [
  { flag: "🇺🇸", name: "United States", value: "US" },
  { flag: "🇬🇧", name: "United Kingdom", value: "UK" },
  // Add more nationality options here
];

const SignUpPage: React.FC = () => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [termsVisible, setTermsVisible] = useState<boolean>(false);
  const [privacyVisible, setPrivacyVisible] = useState<boolean>(false);
  const [isNationalityModalVisible, setNationalityModalVisible] =
    useState<boolean>(false);
  const [selectedNationality, setSelectedNationality] = useState<string | null>(
    null
  );
  const [verificationCode, setVerificationCode] = useState<string | null>(null);
  const [counter, setCounter] = useState<number>(60);
  const [isNoFirstMiddleNameChecked, setIsNoFirstMiddleNameChecked] =
    useState<boolean>(false);

  const [personalData, setPersonalData] = useRecoilState(personalDataAtom);
  const [contactData, setContactData] = useRecoilState(contactDataAtom);
  const [verificationData, setVerificationData] =
    useRecoilState(verificationDataAtom);

  // Add the following line to create a form instance
  const [form] = Form.useForm();
  const [isFieldsFilled, setIsFieldsFilled] = useState<boolean>(false);

  const handleNext = async () => {
    if (currentStep === 2) {
      const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
      setVerificationCode(generatedCode);
      startCounter();
    } else {
      try {
        await form.validateFields();
        setCurrentStep((prevStep) => prevStep + 1);
      } catch (error) {
        console.error("Validation error:", error);
      }
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
    // console.log("Sign In clicked");
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
    // Disable First & Middle Name if the checkbox is checked
    if (values.noFirstMiddleName) {
      form.setFieldsValue({ firstMiddleName: undefined });
    }

    setPersonalData(values);
    handleNext();
  };

  const handleSelectedNationality = (
    value: string | { flag: string; name: string; value: string } | null
  ) => {
    setSelectedNationality(value);
  };

  const onContactFormFinish = (values: ContactFormData) => {
    console.log("Contact Form values:", values);
    setContactData(values);
    handleNext();
  };

  const onVerificationFormFinish = (values: VerificationFormData) => {
    console.log("Verification Form values:", values);
    setVerificationData(values);

    if (values.verificationCode === verificationCode) {
      handleNext();
    } else {
      console.error("Verification code mismatch");
    }
  };

  const showNationalityModal = () => {
    setNationalityModalVisible(true);
  };

  const handleNationalityChange = (value: string) => {
    const selectedOption = nationalityOptions.find(
      (option) => option.value === value
    );
    setSelectedNationality(selectedOption || null);
    setNationalityModalVisible(false);
    form.setFieldsValue({ nationality: value });
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

  useEffect(() => {
    const checkFields = async () => {
      try {
        await form.validateFields();
        setIsFieldsFilled(true);
      } catch (error) {
        setIsFieldsFilled(false);
      }
    };

    checkFields();
  }, [form, currentStep]);

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
            <Steps current={currentStep}>
              <Step title="Personal" />
              <Step title="Contact" />
              <Step title="Check" />
            </Steps>
            {currentStep === 0 && (
              <div>
                <Form
                  form={form}
                  onFinish={onPersonalFormFinish}
                  layout="vertical"
                >
                  <Form.Item
                    label="Salutation"
                    name="salutation"
                    rules={[
                      { required: true, message: "Please select salutation" },
                    ]}
                  >
                    <Select>
                      <Option value="Mr">Mr</Option>
                      <Option value="Mrs">Mrs</Option>
                      <Option value="Ms">Ms</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="First & Middle Name"
                    name="firstMiddleName"
                    rules={[
                      {
                        required: !isNoFirstMiddleNameChecked,
                        message: "Please enter first & middle name",
                      },
                    ]}
                  >
                    <Input disabled={isNoFirstMiddleNameChecked} />
                  </Form.Item>

                  <Form.Item name="noFirstMiddleName" valuePropName="checked">
                    <Checkbox
                      onChange={(e) => {
                        setIsNoFirstMiddleNameChecked(e.target.checked);

                        // Update validation rules for First & Middle Name
                        const rules = e.target.checked
                          ? []
                          : [
                              {
                                required: true,
                                message: "Please enter first & middle name",
                              },
                            ];

                        form.setFields([
                          {
                            name: "firstMiddleName",
                            rules,
                          },
                        ]);
                      }}
                    >
                      This passenger doesn’t have a first & middle name in the
                      passport.
                    </Checkbox>
                  </Form.Item>

                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      { required: true, message: "Please enter last name" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Nationality"
                    name="nationality"
                    rules={[
                      { required: true, message: "Please select nationality" },
                    ]}
                  >
                    <Input
                      readOnly
                      onClick={() => setNationalityModalVisible(true)}
                      value={selectedNationality || ""}
                    />
                  </Form.Item>

                  {/* Nationality Modal */}
                  <Modal
                    title="Select Nationality"
                    open={isNationalityModalVisible}
                    footer={null}
                    onCancel={() => setNationalityModalVisible(false)}
                    centered
                  >
                    <Radio.Group
                      onChange={(e: RadioChangeEvent) => {
                        const selectedValue = e.target.value;
                        const selectedOption = nationalityOptions.find(
                          (option) => option.value === selectedValue
                        );
                        setSelectedNationality(selectedOption || null);
                        setNationalityModalVisible(false);
                        form.setFieldsValue({ nationality: selectedValue });
                      }}
                      value={
                        selectedNationality ? selectedNationality.value : ""
                      }
                    >
                      {nationalityOptions.map((option) => (
                        <Radio key={option.value} value={option.value}>
                          <span
                            role="img"
                            aria-label="flag"
                            style={{ marginRight: "8px" }}
                          >
                            {option.flag}
                          </span>{" "}
                          {option.name}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Modal>

                  <Form.Item
                    label="Date of Birth"
                    name="dob"
                    rules={[
                      {
                        required: true,
                        message: "Please select date of birth",
                      },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={!isFieldsFilled}
                    >
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
                  {/* tambah nomor hp */}
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
                      disabled={!isFieldsFilled}
                    >
                      Next
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
            {currentStep === 2 && (
              <div>
                {/* ambil form dari step 0 dan 1 */}
                {/* dummy form */}
                <Text>Enter the verification code we send you on </Text>
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
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={!isFieldsFilled}
                    >
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

export default SignUpPage;
