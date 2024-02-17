import React from "react";
import { Layout, Breadcrumb } from "antd";
import Logo from "../../components/Logo";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import HomeFooter from "../../components/home_footer";
import IconExplore from "/public/assets/explore.svg";
import GambarCabin1 from "/public/assets/cabin-1.png";
import GambarCabin2 from "/public/assets/cabin-2.png";
import GambarCabin3 from "/public/assets/cabin-3.png";

const { Header, Content, Footer } = Layout;

const AppLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: 16,
          position: "relative",
          zIndex: 100,
        }}
      >
        {/* Your header content here */}

        <h1>Your Header Title</h1>
      </Header>
      <Content style={{ position: "relative", zIndex: 1, height: "auto" }}>
        <div className="bg-primary h-[200px] relative flex items-center justify-center z-2"></div>
        <div className="my-5 mx-[20px] bg-white rounded-lg p-5 h-auto mt-[-150px] z-3 relative">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-[60%]">
              <Breadcrumb style={{ marginBottom: "16px" }}>
                <Breadcrumb.Item>
                  <div
                    className="breadcrumb-item flex items-center gap-2 bg-neutral-background rounded-xl p-2"
                    onClick={() => navigate("/")}
                  >
                    <img
                      src={IconExplore}
                      alt="Icon Explore"
                      className="w-4 h-4"
                    />
                    <div className="flex-grow flex-shrink justify-center">
                      Explore
                    </div>
                  </div>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <div className="breadcrumb-item flex items-center justify-center">
                    Cabin
                  </div>
                </Breadcrumb.Item>
              </Breadcrumb>

              <h1 className="text-primary font-bold text-2xl md:text-4xl font-plus-jakarta-sans flex items-center md:items-start text-center md:text-left">
                Cabin in Our Airlines
              </h1>

              <div className="flex flex-col md:flex-row gap-5 mt-5">
                <img
                  src={GambarCabin1}
                  alt="Gambar Personalized Services Pada Cabin"
                  className="w-[320px] h-[160px] rounded-xl"
                />
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold font-['Plus Jakarta Sans']">
                    Personalized Services
                  </h2>
                  <p className="text-md font-normal font-['Plus Jakarta Sans'] leading-7">
                    Experience our warm, personalized service, making you feel
                    at home throughout your flight.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5 mt-5">
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold font-['Plus Jakarta Sans']">
                    Eco-Friendly Travel
                  </h2>
                  <p className="text-md font-normal font-['Plus Jakarta Sans'] leading-7">
                    Fly with a conscience, thanks to our commitment to
                    sustainable, eco-friendly cabin practices.
                  </p>
                </div>
                <img
                  src={GambarCabin2}
                  alt="Gambar Personalized Services Pada Cabin"
                  className="w-[320px] h-[160px] rounded-xl"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-5 mt-5">
                <img
                  src={GambarCabin3}
                  alt="Gambar Exceptional Cuisine Pada Cabin"
                  className="w-[320px] h-[160px] rounded-xl"
                />
                <div className="flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold font-['Plus Jakarta Sans']">
                    Exceptional Cuisine
                  </h2>
                  <p className="text-md font-normal font-['Plus Jakarta Sans'] leading-7">
                    Savor gourmet meals, crafted by top chefs to bring you a
                    taste of luxury at high altitudes.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="border-l border-gray-500 h-16 mx-4 hidden md:block"
              style={{ marginTop: "20px" }}
            ></div>
            <div className="flex flex-row md:flex-col w-[35%]">
              <p className="text-neutral-link text-lg font-normal font-['Plus Jakarta Sans'] leading-">
                More in Cabin
              </p>
              <div className="mt-5">
                <a href="#">
                  <img
                    src="/public/assets/cabin-first-class.png"
                    alt=""
                    className="w-[280px] h-[160px] rounded-xl"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer
        style={{
          padding: 0,
          position: "relative",
          zIndex: 100,
        }}
      >
        <HomeFooter />
      </Footer>
    </Layout>
  );
};

export default AppLayout;
