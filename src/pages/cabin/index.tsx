import React from "react";
import { Layout, Breadcrumb } from "antd";
import Logo from "../../components/Logo";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import HomeFooter from "../../components/home_footer";

const { Header, Content, Footer } = Layout;

const AppLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: 16 }}>
        {/* Your header content here */}

        <h1>Your Header Title</h1>
      </Header>
      <Content>
        {/* Your main content here */}
        <div className="bg-primary h-200 flex items-center justify-center">
          <div className="my-5 bg-white rounded-lg p-5">
            <Breadcrumb style={{ marginBottom: "16px" }}>
              <Breadcrumb.Item>
                <div className="breadcrumb-item" onClick={() => navigate("/")}>
                  Explore
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <div className="breadcrumb-item">Cabin</div>
              </Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-primary font-bold text-4xl font-plus-jakarta-sans">
              Cabin in Our Airlines
            </h1>
          </div>
        </div>
      </Content>
      <Footer
        style={{
          padding: 0,
        }}
      >
        <HomeFooter />
      </Footer>
    </Layout>
  );
};

export default AppLayout;
