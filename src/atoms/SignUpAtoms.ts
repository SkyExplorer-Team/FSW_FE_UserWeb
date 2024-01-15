// src/atoms/SignUpAtoms.ts
import { atom } from "recoil";
import moment from "moment";

export interface PersonalFormData {
  salutation: string;
  firstMiddleName: string;
  noFirstMiddleName: boolean;
  lastName: string;
  nationality: string;
  dob: moment.Moment;
}

export interface ContactFormData {
  email: string;
  cellphone: string; // Added cellphone field
}

export interface VerificationFormData {
  verificationCode: string;
}

export interface PasswordFormData {
  password: string;
  confirmPassword: string;
}

export const personalDataAtom = atom<PersonalFormData>({
  key: "personalData",
  default: {
    salutation: "",
    firstMiddleName: "",
    noFirstMiddleName: false,
    lastName: "",
    nationality: "",
    dob: moment(),
  },
});

export const contactDataAtom = atom<ContactFormData>({
  key: "contactData",
  default: { email: "", cellphone: "" }, // Added default value for cellphone
});

export const verificationDataAtom = atom<VerificationFormData>({
  key: "verificationData",
  default: { verificationCode: "" },
});

export const passwordDataAtom = atom<PasswordFormData>({
  key: "passwordData",
  default: { password: "", confirmPassword: "" },
});
