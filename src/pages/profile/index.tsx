import React, { useState } from "react";
import "../../styles/StylesProfile.css";
import PersonalInfo from "./PersonalInfo";
import TravelDocument from "./TravelDocument";
import Logo from "../../components/Logo";
import ReactCountryFlag from "react-country-flag";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import HomeNavSide from "../../components/home_navside";

import axios from "axios";
import type { MenuProps } from "antd";
import { Menu, Dropdown } from "antd";
import HomeFooter from "../../components/home_footer";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    label: "Personal Info",
    key: "personalInfo", // Updated key for Personal Info
  },
  {
    label: "Travel Document",
    key: "travelDocument", // Updated key for Travel Document
  },
];

interface UserData {
  id: string;
}

const Index: React.FC = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const handleSignUp = () => {
    navigate("/signup");
  };

  const [activeNavigation, setActiveNavigation] = useState("personalInfo");
  const [current, setCurrent] = useState("personalInfo"); // Updated default value
  const [formValues, setFormValues] = useState<Object>({});
  const [userData, setUserData] = useState<UserData>(Object);

  const handleNavigationClick = (navigation: string) => {
    setActiveNavigation(navigation);
  };

  const onClick = (e: any) => {
    setCurrent(e.key);
    handleNavigationClick(e.key);
  };
  const handleSaveButtonClick = async () => {
    try {
      // Handle saving logic based on the active section
      if (activeNavigation === "personalInfo") {
        // Implement savePersonalInfo logic if needed
        // Perbarui formValues dengan data dari PersonalInfo
        console.log("Saving personal information:", formValues);
        await fetchUserData();        
      } else if (activeNavigation === "travelDocument") {
        // Implement saveTravelDocument logic if needed
        console.log("Saving travel document information:", formValues);
      }
      // Add more conditions for other sections if needed
    } catch (error) {
      console.error("Error during save:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Access token not found in localStorage");
        return;
      }

      const api = axios.create({
        baseURL: "https://be-java-production.up.railway.app/api",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await api.get("/users/me");

      const userData = response.data;

      // Check if the request was successful
      if (userData.status === "success") {
        // Extract relevant user data
        setUserData(userData.data.id);
      } else {
        console.error("Failed to fetch user data:", userData.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="h-screen flex col-span-12 md:col-span-3">
            <HomeNavSide />
          </div>
          <div className="h-screen flex col-span-12 md:col-span-9">
            <div
              className="bg-white p-8 rounded shadow-md card"
              style={{
                width: "100%",
                height: "800px",
                overflow: "scroll",
                overflowX: "hidden",
              }}
            >
              <div className="heading">
                <h1 className="profile-title">Profile</h1>
                <button className="btn-save" onClick={handleSaveButtonClick}>
                  Save
                </button>
              </div>
              <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
              />
              {activeNavigation === "personalInfo" && (
                <PersonalInfo
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              )}
              {activeNavigation === "travelDocument" && (
                <TravelDocument
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default Index;
