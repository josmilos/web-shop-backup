import React from "react";
import PageContent from "../components/PageContent";

const content = {
  title: "Welcome to Our Website",
  description: "Thank you for visiting. Please log in or sign up to see content!",
};

const HomePage = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    heading: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    paragraph: {
      fontSize: "18px",
      lineHeight: "1.5",
      textAlign: "center",
    },
  };

  return <PageContent content={content} />;
};

export default HomePage;
