import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Project = {
  projectId: string;
  projectName: string;
  startDate: string;
  endDate: string;
  projectDescription: string;
  projectManager: string;
};

export const allLocalProjects = atomWithStorage<Project[]>("allProjects", []);

export const selectedProject = atom<{
  selectedProject: number | null;
  createNewProject: boolean;
}>({
  selectedProject: null,
  createNewProject: false,
});

// export const isProjectUpdated = atom(false);
