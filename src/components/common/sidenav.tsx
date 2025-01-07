import { Divider } from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { allLocalProjects, Project, selectedProject } from "../../store";

type props = {
  classname?: string;
  allProject: Project[];
};

const SideNav = (props: props) => {
  return (
    <div
      className={`w-full rounded shadow h-full p-2 ${props.classname} flex flex-col max-sm:hidden`}
    >
      <h2 className="text-2xl font-semibold py-2">Favorite Projects</h2>
      <Divider />
      <ul className="flex flex-col gap-2 font-medium p-2 mt-2 list-disc">
        {props.allProject.map((item, index) => (
          <div
            className="p-2 rounded shadow border transition-all"
            key={`${item.projectId}-${index}`}
          >
            {item.projectName}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
