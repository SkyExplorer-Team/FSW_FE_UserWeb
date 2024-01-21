// src/components/SignUpForm.tsx
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
// import { GoogleOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import {
  personalDataAtom,
  contactDataAtom,
  ContactFormData,
  PersonalFormData,
} from "../atoms/SignUpAtoms";
import moment, { Moment } from "moment";
import Title from "antd/es/typography/Title";

const { Step } = Steps;
const { Text } = Typography;
const { Option } = Select;

// Dummy data for nationality options (replace with actual data)
const nationalityOptions = [
  { flag: "🇺🇸", name: "United States", value: "US" },
  { flag: "🇬🇧", name: "United Kingdom", value: "UK" },
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

const SignUpForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isFieldsFilled, setIsFieldsFilled] = useState<boolean>(false);
  const [isNoFirstMiddleNameChecked, setIsNoFirstMiddleNameChecked] =
    useState<boolean>(false);
  const [personalData, setPersonalData] = useRecoilState(personalDataAtom);
  const [contactData, setContactData] = useRecoilState(contactDataAtom);

  const [isNationalityModalVisible, setNationalityModalVisible] =
    useState<boolean>(false);
  const [selectedNationality, setSelectedNationality] = useState<string | null>(
    null
  );
  const [isPersonalFormValid, setIsPersonalFormValid] =
    useState<boolean>(false);
  const [isContactFormValid, setIsContactFormValid] = useState<boolean>(false);

  const [form] = Form.useForm();

  const handleNext = useCallback(async () => {
    try {
      await form.validateFields();
      console.log("Validation successful. Moving to the next step.");
      setCurrentStep((prevStep) => prevStep + 1);
      setIsFieldsFilled(false); // Reset for the next step
      setIsPersonalFormValid(false); // Reset validation flags for each step
      setIsContactFormValid(false);
    } catch (error) {
      console.error("Validation error:", error);
    }
  }, [
    form,
    setCurrentStep,
    setIsFieldsFilled,
    setIsPersonalFormValid,
    setIsContactFormValid,
  ]);

  const handleStepClick = (step: number) => {
    if (step < currentStep && isFieldsFilled) {
      setCurrentStep(step);
    }
  };

  const isStepClickable = (step: number) => {
    return step < currentStep && isFieldsFilled;
  };

  const onPersonalFormFinish = (values: PersonalFormData) => {
    // Disable First & Middle Name if the checkbox is checked
    if (values.noFirstMiddleName) {
      form.setFieldsValue({ firstMiddleName: undefined });
    }

    setPersonalData(values);
    handleNext();
  };

  const onContactFormFinish = (values: ContactFormData) => {
    // Handle contact form data
    console.log("Contact Form values:", values);
    setContactData(values);
    handleNext();
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

  useEffect(() => {
    const checkFields = async () => {
      try {
        await form.validateFields();
        setIsFieldsFilled(true);
        setIsPersonalFormValid(true); // Add validation for each step
        setIsContactFormValid(true);
      } catch (error) {
        console.error("Validation error:", error);
        setIsFieldsFilled(false);
        setIsPersonalFormValid(false); // Reset validation flags for each step
        setIsContactFormValid(false);
      }
    };

    checkFields();
  }, [
    form,
    currentStep,
    setIsFieldsFilled,
    setIsPersonalFormValid,
    setIsContactFormValid,
  ]);

  return (
    <div>
      <Steps current={currentStep}>
        <Step
          title="Personal"
          onClick={() => handleStepClick(0)}
          disabled={!isStepClickable(0)}
        />
        <Step
          title="Contact"
          onClick={() => handleStepClick(1)}
          disabled={!isStepClickable(1)}
        />
        <Step
          title="Check"
          onClick={() => handleStepClick(2)}
          disabled={!isStepClickable(2)}
        />
      </Steps>

      {currentStep === 0 && (
        <div>
          <Form form={form} onFinish={onPersonalFormFinish} layout="vertical">
            <Form.Item
              label="Salutation"
              name="salutation"
              rules={[{ required: true, message: "Please select salutation" }]}
              validateTrigger={["onChange", "onBlur"]}
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
                {
                  pattern: /^[A-Za-z\s]+$/, // Only allow alphabets and spaces
                  message: "Please enter a valid name with alphabets only",
                },
              ]}
            >
              <Input disabled={isNoFirstMiddleNameChecked} />
            </Form.Item>

            <Form.Item name="noFirstMiddleName" valuePropName="checked">
              <Checkbox
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
              rules={[
                { required: true, message: "Please enter last name" },
                {
                  pattern: /^[A-Za-z\s]+$/, // Only allow alphabets and spaces
                  message: "Please enter a valid last name with alphabets only",
                },
              ]}
              validateTrigger={["onChange", "onBlur"]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[{ required: true, message: "Please select nationality" }]}
              validateTrigger={["onChange", "onBlur"]}
            >
              <Input
                readOnly
                onClick={() => setNationalityModalVisible(true)}
                value={selectedNationality || ""}
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
              <div>
                <Text>
                  Please select your nationality from the options below for the
                  personal information.
                </Text>
                <Radio.Group
                  onChange={(e: RadioChangeEvent) => {
                    const selectedValue = e.target.value;
                    setSelectedNationality(selectedValue); // Only set the value, not the object
                    setNationalityModalVisible(false);
                    form.setFieldsValue({ nationality: selectedValue }); // Update form field
                  }}
                  value={selectedNationality} // Use the selected value directly
                  style={{ display: "flex", flexDirection: "column" }}
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
              </div>
            </Modal>

            <Form.Item
              label="Date of Birth"
              name="dob"
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
                disabledDate={(currentDate) =>
                  currentDate && currentDate >= moment().endOf("day")
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isPersonalFormValid}
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
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number",
                },
                {
                  validator: (_, value) => {
                    // Validate phone number length and format
                    const isValidPhoneNumber = /^\d{8,}$/.test(value?.number);

                    if (!isValidPhoneNumber) {
                      return Promise.reject(
                        "Invalid phone number. Please enter a valid phone number with at least 8 digits."
                      );
                    }

                    return Promise.resolve();
                  },
                },
              ]}
              validateTrigger={["onChange", "onBlur"]}
            >
              <Input.Group compact style={{ display: "flex", gap: "8px" }}>
                {/* Select for Country Code */}
                <Form.Item
                  name={["phoneNumber", "countryCode"]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please select country code",
                    },
                  ]}
                  validateTrigger={["onChange", "onBlur"]}
                >
                  <Select style={{ width: "25%" }} showArrow={false}>
                    {/* Add your country code options here */}
                    <Option value="+62">+62</Option>
                    {/* Add more country codes as needed */}
                  </Select>
                </Form.Item>
                {/* Input for Phone Number */}
                <Form.Item
                  name={["phoneNumber", "number"]}
                  noStyle
                  style={{ flex: 1 }}
                >
                  <Input />
                </Form.Item>
              </Input.Group>
            </Form.Item>

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
              validateTrigger={["onChange", "onBlur"]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isContactFormValid}
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
          <Title>Double Check</Title>
          <Text>
            Almost there! Ensure all your details are accurate before hitting
            the submit button.
          </Text>
          <Text>First & Middle Name: {personalData.firstMiddleName}</Text>
          <Text>Last Name: {personalData.lastName}</Text>
          <Text>Date of Birth: {personalData.dob.format("YYYY-MM-DD")}</Text>
          <Text>Email: {contactData.email}</Text>
          <Form onFinish={handleNext} layout="vertical">
            {/* ... (your existing verification form fields) */}
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
  );
};

export default SignUpForm;
