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
}

export interface VerificationFormData {
  verificationCode: string;
}

export const personalDataAtom = atom<PersonalFormData>({
  key: "personalData",
  default: {
    salutation: "", // Set default value as needed
    firstMiddleName: "",
    noFirstMiddleName: false,
    lastName: "",
    nationality: "",
    dob: moment(),
  },
});

export const contactDataAtom = atom<ContactFormData>({
  key: "contactData",
  default: { email: "" },
});

export const verificationDataAtom = atom<VerificationFormData>({
  key: "verificationData",
  default: { verificationCode: "" },
});
