import { Button, TextareaAutosize, TextField } from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { allLocalProjects, selectedProject } from "../../store";
import { useNavigate } from "react-router-dom";
import SideNav from "../../components/common/sidenav";

const EditProjectPage = () => {
  const [allProject, setAllLocalProject] = useAtom(allLocalProjects);
  const [activeProject, setActiveProject] = useAtom(selectedProject);
  const [projectId, setProjectId] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: "",
      projectDescription: "",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      projectManager: "",
      projectId: "",
    },
  });

  useEffect(() => {
    if (
      typeof activeProject.selectedProject == "number" &&
      activeProject.selectedProject > -1
    ) {
      const projectDetails = allProject[activeProject.selectedProject];
      setValue("projectName", projectDetails.projectName);
      setValue("projectDescription", projectDetails.projectDescription);
      setValue("startDate", projectDetails.startDate);
      setValue("endDate", projectDetails.endDate);
      setValue("projectManager", projectDetails.projectManager);
      setValue("projectId", projectDetails.projectId);
      setProjectId(projectDetails.projectId);
    }
  }, [activeProject.selectedProject]);

  const updateProject = (projectDetails: any) => {
    if (
      typeof activeProject.selectedProject == "number" &&
      activeProject.selectedProject > -1
    ) {
      allProject.splice(activeProject.selectedProject, 1, projectDetails);
      setAllLocalProject(allProject);
      navigate("/");
    }
  };

  const createNewProject = (projectDetails: any) => {
    projectDetails.projectId = `Project-${allProject.length}`;
    setAllLocalProject((state) => [...state, projectDetails]);
  };

  const onSubmit = (data: any) => {
    // check if update or create
    if (
      typeof activeProject.selectedProject == "number" &&
      activeProject.selectedProject > -1
    ) {
      updateProject(data);
    } else {
      createNewProject(data);
      setActiveProject(() => ({
        selectedProject: null,
        createNewProject: false,
      }));
      navigate("/");
    }
  };

  return (
    <div className="flex gap-5 h-screen ">
      <SideNav classname="sm:max-w-[300px]" allProject={allProject} />
      <div className="w-full p-5">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <a href="/">
            <Button className="w-[150px] transform-none"> All Projects </Button>
          </a>
          <div className="flex gap-5">
            <p>Project ID : </p>
            <p>{projectId}</p>
          </div>
          <TextField
            label="Project Name"
            variant="outlined"
            sx={{ maxWidth: 300 }}
            {...register("projectName", { required: "First Name is required" })}
            error={!!errors.projectName}
            helperText={errors.projectName?.message}
          />
          <div className="w-full">
            <p className="text-gray-700">Description</p>
            <TextareaAutosize
              className="w-full border rounded max-w-[600px] p-2"
              minRows={5}
              maxRows={10}
              {...register("projectDescription")}
            />
          </div>
          <TextField
            label="Start Date"
            variant="outlined"
            sx={{ maxWidth: 300 }}
            {...register("startDate", { required: "Start Date is required" })}
            error={!!errors.startDate}
            helperText={errors.startDate?.message}
            type="date"
          />
          <TextField
            label="End Date"
            variant="outlined"
            sx={{ maxWidth: 300 }}
            {...register("endDate", { required: "End Date is required" })}
            error={!!errors.endDate}
            helperText={errors.endDate?.message}
            type="date"
          />
          <TextField
            label="Project Manager"
            variant="outlined"
            sx={{ maxWidth: 300 }}
            {...register("projectManager", {
              required: "Project Manager is required",
            })}
            error={!!errors.projectManager}
            helperText={errors.projectManager?.message}
          />
          <Button variant="contained" sx={{ maxWidth: 200 }} type="submit">
            {typeof activeProject.selectedProject === "number" &&
            activeProject.selectedProject > -1
              ? "Update"
              : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default EditProjectPage;
