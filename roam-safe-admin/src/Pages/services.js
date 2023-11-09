import { Box, Button, Modal, TablePagination, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AdminLayout from "../Layout";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { deleteApiihandler, getApihandler, postApihandler, putApihandler } from "../Apihandler";
import swal from "sweetalert";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const columns = [
  { id: "Sr no.", label: "Sr no." },
  {
    id: "Name",
    label: "Name",
  },
  
  {
    id: "Action",
    label: "Action",
  },
];
export default function Services() {
  const { register, handleSubmit, reset, setValue } = useForm();
  //........UseState......////
  const [data,setData] = React.useState([])
  const [Id, setId] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [Index, setIndex] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
    if (Index !== "") {
      setIndex("");
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // .......useEffect.....////

  useEffect(()=>{
      getServices();
  },[])

    useEffect(() => {
      if (Index !== "") {
        const { serviceName, _id } = data[Index];
        setValue("serviceName", serviceName);
      
        setId(_id);
      }
    }, [Index]);

  // ..........Apis...../////
  const getServices =async()=>{
      const response = await getApihandler("/getServices/All");
      // console.log("reponse----->", response);

      setData(response.data)
  }
  const addService = async (value) => {
    const response =
      Index === ""
        ? await postApihandler("/addServices", value)
        : await putApihandler(`/updateServices/${Id}`, value);
    // console.log("response==>", response);
    handleClose();
    reset();

    setIndex("");
    if (response.status === 200) {
      Swal.fire({
        position: "middle-centre",
        icon: "success",
        title: Index === "" ? "Successfully Added" : "Successfully Update",
        showConfirmButton: false,
        timer: 2000,
      });
       getServices();
    } else {
      swal("Sorry!", `${response.error.response.data.message}`, "error").then(
        (value) => {}
      );
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
  const deleteres = await deleteApiihandler("/deleteServices/", _id);
  // console.log("data=>", deleteres.status);
  if (deleteres.status === 403) {
    swal(
      "Can't delete",
      "Model details cannot be deleted because it has models with it"
    );
  } else {
    swal("Poof! Your imaginary file has been deleted!", {
      icon: "success",
    });
     getServices();
  }
};

  return (
    <AdminLayout>
      <h1>Services</h1>
      <div style={{ display: "flex" }}>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#EE4848",
            fontWeight: "700",
            fontSize: "12px",
          }}
          onClick={handleOpen}
        >
          Add Service
        </Button>
      </div>
      {/* .............model........///// */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="d-flex align-items-center justify-content-start">
              {Index === "" ? (
                <Typography component="h1" variant="h5">
                  Add Service
                </Typography>
              ) : (
                <Typography component="h1" variant="h5">
                  Update Service
                </Typography>
              )}
            </div>
            <Box
              component="form"
              onSubmit={handleSubmit(addService)}
              noValidate
              sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: "20px" }}
            >
              <TextField
                fullWidth
                type="text"
                placeholder="Service Name"
                id="outlined-size-small"
                size="small"
                name="serviceName"
                {...register("serviceName")}
              />

              {Index === "" ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 2,
                    backgroundColor: "#EE4848",
                    fontWeight: "700",
                    fontSize: "12px",
                  }}
                >
                  Add
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 2,
                    backgroundColor: "#EE4848",
                    fontWeight: "700",
                    fontSize: "12px",
                  }}
                >
                  Update
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* .............table........///// */}
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
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
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
                        <TableCell>{val.serviceName}</TableCell>

                        <TableCell
                          sx={{
                            display: "flex",
                            gap: "20px",
                          }}
                        >
                          <Link>
                            <EditIcon
                              sx={{ color: "black" }}
                              onClick={() => {
                                setIndex(index);
                                handleOpen();
                              }}
                            />
                          </Link>
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
