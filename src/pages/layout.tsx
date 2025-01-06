import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./home";
import SideNav from "../components/common/sidenav";
import EditProjectPage from "./EditProject";
import { useAtom } from "jotai";
import { allLocalProjects } from "../store";

const Layout = () => {
  const [allProject] = useAtom(allLocalProjects);
  return (
    <div className="flex h-full w-full gap-3 ">
      <div className="flex-1">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/editProject" element={<EditProjectPage />} />
            <Route path="*" element={<div> Not Found </div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Layout;
