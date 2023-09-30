import React from "react";
import AdminLayout from "../Layout";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
} from "@mui/material";
import { getApihandler, putApihandler } from "../Apihandler";
import { useEffect } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
const columns = [
  { id: "Sr no.", label: "Sr no." },
  {
    id: "Name",
    label: "Name",
  },
  {
    id: "Email Address",
    label: "Email Address",
  },
  {
    id: "Mobile No.",
    label: "Mobile No.",
  },
  {
    id: "Approved/Reject",
    label: "Approved/Reject",
  },
  {
    id: "View",
    label: "View",
  },
];
export default function Towing() {
  // useState
  const [mechId, setMechId] = React.useState("");
  const [flag, setFlage] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // useEffect
  useEffect(() => {
    getTowing();
  }, []);
  useEffect(() => {
    if (flag !== 0) {
      verifyMech();
    }
  }, [flag]);

  const verifyMech = async () => {
    const aaray = {
      verify_status: flag,
    };
    console.log("flag-->", flag);
    console.log("mechId-->", mechId);
    const reponse = await putApihandler(`/verifyTowingProvider/${mechId}`, aaray);
    console.log("------->", reponse);
    setMechId("");
    setFlage(0);
    getTowing();
  };
  const getTowing = async () => {
    const response = await getApihandler("/getAllTowingProvider/All");
    console.log("reponse----->", response);
    if (response.status === 200) {
      setData(response.data);
    }
  };
  return (
    <AdminLayout>
      <h1>Towing</h1>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#ff400024",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <div>
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </div>
              ) : (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((val, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {index + 1}.
                        </TableCell>
                        <TableCell>{val.name}</TableCell>
                        <TableCell>{val.email}</TableCell>
                        <TableCell>{val.phone_number}</TableCell>
                        {val.verify_status === 0 || val.verify_status === -1 ? (
                          <TableCell>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setMechId(val._id);
                                setFlage(1);
                              }}
                              sx={{ textTransform: "capitalize" }}
                            >
                              Approved
                            </Button>
                          </TableCell>
                        ) : (
                          <TableCell>
                            {" "}
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => {
                                setMechId(val._id);
                                setFlage(-1);
                              }}
                              sx={{ textTransform: "capitalize" }}
                            >
                              Reject
                            </Button>
                          </TableCell>
                        )}

                        <TableCell>
                          <Link to={`/towing-detail/${val._id}`}>
                            <RemoveRedEyeIcon sx={{ color: "black" }} />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </AdminLayout>
  );
}
