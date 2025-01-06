import React from "react";
import ProjectTable from "../../components/homePage/ProjectTable";
import { Button } from "@mui/material";
import { allLocalProjects, selectedProject } from "../../store";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import SideNav from "../../components/common/sidenav";

const HomePage = () => {
  const [_, setSelectedProject] = useAtom(selectedProject);
  const navigate = useNavigate();
  const [allProject] = useAtom(allLocalProjects);

  const handleCreateNewProject = () => {
    setSelectedProject((state) => ({ ...state, createNewProject: true }));
    navigate("/editProject");
  };

  return (
    <div className="flex h-screen">
      <SideNav classname="sm:max-w-[300px]" allProject={allProject} />

      <div className="flex-1 p-5">
        <ProjectTable />

        <Button
          variant="contained"
          style={{ marginTop: "20px" }}
          onClick={handleCreateNewProject}
        >
          Add new Project
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
