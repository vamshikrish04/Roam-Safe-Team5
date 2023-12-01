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
import { getApihandler } from "../Apihandler";
import  { useEffect } from "react";
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
];
export default function Users() {
    // useState
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
       getUsers();
     }, []);
     const getUsers = async () => {
       const response = await getApihandler("/getAllUser/All");
       // console.log("reponse----->", response);
       if(response.status === 200){
            setData(response.data);
       }
     
     };
  return (
    <AdminLayout>
      <h1>Users</h1>
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
                        <TableCell>
                          {val.first_name}
                          {val.last_name}
                        </TableCell>
                        <TableCell>{val.userEmail}</TableCell>
                        <TableCell>{val.phone_number}</TableCell>
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
