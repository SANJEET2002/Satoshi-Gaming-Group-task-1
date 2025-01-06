import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { allLocalProjects, selectedProject } from "../../store";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export default function ProjectTable() {
  const navigate = useNavigate();
  // get all projects
  const [allProjects] = useAtom(allLocalProjects);
  const [_, setActiveProject] = useAtom(selectedProject);

  if (allProjects.length === 0) {
    return <div className="text-center">No Projects</div>;
  }

  const onEditProject = (projectIndex: number) => {
    setActiveProject({
      createNewProject: false,
      selectedProject: projectIndex,
    });
    navigate("/editProject");
  };

  return (
    <TableContainer component={Paper} className="w-full">
      <Table sx={{ minWidth: 650 }} className="w-full">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Project ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Project Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Project Manager</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allProjects &&
            allProjects.map((row, index) => (
              <TableRow key={row.projectId}>
                <TableCell component="th" scope="row">
                  {row.projectId}
                </TableCell>
                <TableCell>{row.projectName}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.projectManager}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => onEditProject(index)}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
