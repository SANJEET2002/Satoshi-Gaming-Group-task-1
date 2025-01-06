import React from "react";
import "./styles.css";
import Layout from "./pages/layout";

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-auto">
      <Layout />
    </div>
  );
};

export default App;
