import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
  Button,
} from "@mui/material";
import { getApihandler } from "../Apihandler";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
const columns = [
  { id: "Sr no.", label: "Sr no." },
  {
    id: "Name",
    label: "Name",
  },
  {
    id: "Send Message",
    label: "Send Message",
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

export default function ChatAll() {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = React.useState([]);
  const [mechanics, setMechanics] = React.useState([]);
  const [towing, setTowing] = React.useState([]);

  React.useEffect(() => {
    getUsers();
    getMechanic();
 getTowings();
  }, []);
  const getTowings = async () => {
    const res = await getApihandler("/getAllChatTowing");
    console.log("res t-->", res);
    if (res.status === 200) {
      setTowing(res.data);
    }
  };
  const getMechanic = async () => {
    const res = await getApihandler("/getAllChatMechanic");
    console.log("res m-->", res);
    if (res.status === 200) {
      setMechanics(res.data);
    }
  };
  const getUsers = async () => {
    const res = await getApihandler("/getAllChatUser");
    console.log("res-->", res);
    if (res.status === 200) {
      setUsers(res.data);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AdminLayout>
      <h1>Chat All</h1>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Users" {...a11yProps(0)} />
            <Tab label="Mechanic" {...a11yProps(1)} />
            <Tab label="Towing" {...a11yProps(2)} />
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
                  {users.length === 0 ? (
                    <div>
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    </div>
                  ) : (
                    users
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
                            <TableCell>{val.username}</TableCell>
                            <TableCell>
                              <Link to={`/chat-admin-user/${val.userId}`}>
                                <Button size="small" variant="contained">
                                  Chat
                                </Button>
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
              count={users.length}
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
                  {mechanics.length === 0 ? (
                    <div>
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    </div>
                  ) : (
                    mechanics
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
                            <TableCell>{val.mechanicName}</TableCell>
                            <TableCell>
                              <Link
                                to={`/chat-admin-mechanic/${val.mechanicId}`}
                              >
                                <Button size="small" variant="contained">
                                  Chat
                                </Button>
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
              count={mechanics.length}
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
                  {towing.length === 0 ? (
                    <div>
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    </div>
                  ) : (
                    towing
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
                            <TableCell>{val.towingName}</TableCell>
                            <TableCell>
                              <Link to={`/chat-admin-towing/${val.towingId}`}>
                                <Button size="small" variant="contained">
                                  Chat
                                </Button>
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
              count={towing.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </CustomTabPanel>
      </Box>
    </AdminLayout>
  );
}
