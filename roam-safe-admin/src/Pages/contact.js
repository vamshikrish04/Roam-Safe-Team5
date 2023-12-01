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
import { deleteApiihandler, getApihandler } from "../Apihandler";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
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
    id: "Message",
    label: "Message",
  },
  {
    id: "Action",
    label: "Action",
  },
];
export default function Contact() {
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
    getContact();
  }, []);
  const getContact = async () => {
    const response = await getApihandler("/getContacts");
    // console.log("reponse----->", response);
    if (response.status === 200) {
      setData(response.data);
    }
  };
  const deleteProperty = (index) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteData(index);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const deleteData = async (index) => {
    const { _id } = data[index];
    // console.log("id=>", _id);
    const deleteres = await deleteApiihandler("/deleteContact/", _id);
     console.log("data=>", deleteres);
    if (deleteres.status === 403) {
      swal(
        "Can't delete",
        "Model details cannot be deleted because it has models with it"
      );
    } else {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
      getContact();
    }
  };
  return (
    <AdminLayout>
      <h1>Contact</h1>
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
                        <TableCell>{val.mobile_no}</TableCell>
                        <TableCell>{val.message}</TableCell>
                        <TableCell>
                          {" "}
                          <Link>
                            <DeleteIcon
                              sx={{ color: "black" }}
                              onClick={() => {
                                deleteProperty(index);
                              }}
                            />
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
