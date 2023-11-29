import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Container,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { getApihandler, postApihandler } from "../Apihandler";
import { useEffect } from "react";
import Layout from "../Layout/layout";
import { useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import swal from "sweetalert";

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

const labels = {
  1: "Useless+",

  2: "Poor+",

  3: "Ok+",

  4: "Good+",

  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const columns = [
  { id: "Sr no.", label: "Sr no." },
  {
    id: "carModel",
    label: "Car Model",
  },
  {
    id: "issue",
    label: "Issue",
  },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "mechanic",
    label: "Mechanic Name",
  },
  {
    id: "mobile",
    label: "Mobile",
  },
  {
    id: "Message",
    label: "Message",
  },
  {
    id: "Status",
    label: "Status",
  },
];

const breakdownColumns = [
  { id: "Sr no.", label: "Sr no." },
  {
    id: "service",
    label: "Service",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "mechanic",
    label: "Mechanic Name",
  },
  {
    id: "mobile",
    label: "Mobile",
  },
  {
    id: "Message",
    label: "Message",
  },
  {
    id: "Status",
    label: "Status",
  },
];

const towingColumns = [
  { id: "Sr no.", label: "Sr no." },
  {
    id: "carModel",
    label: "Car Model",
  },
  {
    id: "service",
    label: "Service",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "towingProviderName",
    label: "Towing Provider Name",
  },
  {
    id: "mobile",
    label: "Mobile",
  },
  {
    id: "Message",
    label: "Message",
  },
  {
    id: "Status",
    label: "Status",
  },
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function BookingHistoryUser() {
  const { register, handleSubmit, reset } = useForm();
  // useState
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [breakdownData, setBreakdownData] = React.useState([]);
  const [towingData, setTowingData] = React.useState([]);
  const [value1, setValue1] = React.useState(0);
  const [cheak, setcheak] = React.useState("");
  console.log("value1-->", value1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [userId, setUserId] = React.useState();
  const [mechanicId, setMechanicId] = React.useState();
  // console.log("userId - ", userId);
  // Tab -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-xx-x-x-
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // /Tab -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-xx-x-x-

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // useEffect
  useEffect(() => {
    if (userId !== undefined && userId !== null) {
      getBookings();
    }
  }, [userId]);

  // useEffect
  useEffect(() => {
    setUserId(localStorage.getItem("Id"));
  }, []);

  const getBookings = async () => {
    const regularResponse = await getApihandler(
      `/getMechanicBooking/userId_${userId}`
    );
    console.log("regularResponse-->", regularResponse);

    if (regularResponse.status === 200) {
      setData(regularResponse.data);
    }

    const breakdownResponse = await getApihandler(
      `/getAllEmergencyBooking/userId_${userId}`
    );
    console.log("breakdownResponse----->", breakdownResponse);
    if (breakdownResponse.status === 200) {
      setBreakdownData(breakdownResponse.data);
    }

    const towingResponse = await getApihandler(
      `/getTowingBooking/userId_${userId}`
    );
    console.log("towingResponse----->", towingResponse);
    if (towingResponse.status === 200) {
      setTowingData(towingResponse.data);
    }
  };
  const onSubmit = async (value) => {
    console.log("userId", userId);
    console.log("mechanicId", mechanicId);
    const { review } = value;
    if (cheak === "regular") {
      const item = {
        rating: value1,
        review: review,
      };
      const res = await postApihandler(
        `/addReviewRating/${userId}/${mechanicId}`,
        item
      );
      console.log("rating---------------->", res);
      if (res.status === 200) {
        Swal.fire({
          position: "middle-centre",
          icon: "success",
          title: "Successfully Added",
          showConfirmButton: false,
          timer: 2000,
        });
        setValue1(0);
        reset();
        handleClose();
      } else {
        swal("Sorry!", `${res.error.response.data.message}`, "error");
      }
    } else if (cheak === "breakdown") {
      const item = {
        rating: value1,
        review: review,
      };
      const res = await postApihandler(
        `/addReviewRating/${userId}/${mechanicId}`,
        item
      );
      console.log("res---------------->", res);
      if (res.status === 200) {
        Swal.fire({
          position: "middle-centre",
          icon: "success",
          title: "Successfully Added",
          showConfirmButton: false,
          timer: 2000,
        });
        setValue1(0);
        reset();
        handleClose();
      } else {
        swal("Sorry!", `${res.error.response.data.message}`, "error");
      }
    } else if (cheak === "towing") {
      const item = {
        rating: value1,
        review: review,
      };
      const res = await postApihandler(
        `/addReviewRatingForTowing/${userId}/${mechanicId}`,
        item
      );
      console.log("res---------------->", res);
      if (res.status === 200) {
        Swal.fire({
          position: "middle-centre",
          icon: "success",
          title: "Successfully Added",
          showConfirmButton: false,
          timer: 2000,
        });
        setValue1(0);
        reset();
        handleClose();
      } else {
        swal("Sorry!", `${res.error.response.data.message}`, "error");
      }
    }
  };
  return (
    <Layout>
      <Container className="my-5">
        <h2 style={{ textAlign: "start", padding: "10px" }}>Booking History</h2>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Regular Service" {...a11yProps(0)} />
            <Tab label="Breakdown Service" {...a11yProps(1)} />
            <Tab label="Towing Service" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
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
                          backgroundColor: "#EE4848",
                          color: "White",
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
                    <h3>No Data</h3>
                  ) : (
                    data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((val, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {index + 1}.
                            </TableCell>
                            <TableCell>{val.car_model}</TableCell>
                            <TableCell>{val.issue_in_car}</TableCell>
                            <TableCell>{val.date}</TableCell>
                            <TableCell>{val.time}</TableCell>
                            <TableCell>{val.mechanicName}</TableCell>
                            <TableCell>{val.mechaicMobileNo}</TableCell>
                            <TableCell>
                              <Link to={`/chat/${val.mechanicId}`}>
                                <IconButton>
                                  <ChatIcon />
                                </IconButton>
                              </Link>
                            </TableCell>
                            <TableCell>
                              {val.booking_status === 0 ? (
                                "Pending"
                              ) : val.booking_status === 1 ? (
                                "Accepted"
                              ) : val.booking_status === -1 ? (
                                "Rejected"
                              ) : val.booking_status === 2 ? (
                                <Link
                                  to={`/payment-regular-service/${userId}/${val.mechanicId}/${val._id}`}
                                >
                                  <Button variant="contained" size="small">
                                    Pay
                                  </Button>
                                </Link>
                              ) : val.booking_status === 5 ? (
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() => {
                                    handleOpen();
                                    setcheak("regular");
                                    setMechanicId(val.mechanicId);
                                  }}
                                >
                                  Review
                                </Button>
                              ) : (
                                ""
                              )}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {breakdownColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#EE4848",
                          color: "White",
                          fontWeight: "bold",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {breakdownData.length === 0 ? (
                    <h3>No Data</h3>
                  ) : (
                    breakdownData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((val, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {index + 1}.
                            </TableCell>
                            <TableCell>{val.service_needed}</TableCell>
                            <TableCell>{val.description}</TableCell>
                            <TableCell>{val.mechanicName}</TableCell>
                            <TableCell>{val.mechaicMobileNo}</TableCell>
                            <TableCell>
                              <Link
                                to={`/chat-emergency-user/${val.mechanicId}`}
                              >
                                <IconButton>
                                  <ChatIcon />
                                </IconButton>
                              </Link>
                            </TableCell>
                            <TableCell>
                              {val.booking_status === 0 ? (
                                "Pending"
                              ) : val.booking_status === 1 ? (
                                "Accepted"
                              ) : val.booking_status === -1 ? (
                                "Rejected"
                              ) : val.booking_status === 2 ? (
                                <Link
                                  to={`/payment-breakdown-service/${userId}/${val.mechanicId}/${val._id}`}
                                >
                                  <Button variant="contained" size="small">
                                    Pay
                                  </Button>
                                </Link>
                              ) : val.booking_status === 5 ? (
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() => {
                                    handleOpen();
                                    setcheak("breakdown");
                                    setMechanicId(val.mechanicId);
                                  }}
                                >
                                  Review
                                </Button>
                              ) : (
                                ""
                              )}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {towingColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#EE4848",
                          color: "White",
                          fontWeight: "bold",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {towingData.length === 0 ? (
                    <h3>No Data</h3>
                  ) : (
                    towingData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((val, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {index + 1}.
                            </TableCell>
                            <TableCell>{val.car_model}</TableCell>
                            <TableCell>{val.towing_needed}</TableCell>
                            <TableCell>{val.description}</TableCell>
                            <TableCell>{val.towingProviderName}</TableCell>
                            <TableCell>{val.towingProviderMobileNo}</TableCell>
                            <TableCell>
                              <Link to={`/chat-towing-user/${val.towingId}`}>
                                <IconButton>
                                  <ChatIcon />
                                </IconButton>
                              </Link>
                            </TableCell>
                            <TableCell>
                              {val.booking_status === 0 ? (
                                "Pending"
                              ) : val.booking_status === 1 ? (
                                "Accepted"
                              ) : val.booking_status === -1 ? (
                                "Rejected"
                              ) : val.booking_status === 2 ? (
                                <Link
                                  to={`/payment-towing-service/${userId}/${val.towingId}/${val._id}`}
                                >
                                  <Button variant="contained" size="small">
                                    Pay
                                  </Button>
                                </Link>
                              ) : val.booking_status === 5 ? (
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() => {
                                    handleOpen();
                                    setcheak("towing");
                                    setMechanicId(val.towingId);
                                  }}
                                >
                                  Review
                                </Button>
                              ) : (
                                ""
                              )}
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
        </CustomTabPanel>
      </Container>
      {/* .....model..... */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography>Rating</Typography>
            <Rating
              name="hover-feedback"
              value={value1}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue1(newValue);
              }}
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              label="Review"
              variant="standard"
              fullWidth
              name="review"
              {...register("review")}
            />
            <br />
            <br />
            <Button variant="contained" size="small" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </Layout>
  );
}
