import React, { useEffect } from "react";
import { getApihandler } from "../Apihandler";
import Layout from "../Layout/layout";
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
  Typography,
} from "@mui/material";
const columns = [
  { id: "Sr no.", label: "Sr no." },
  {
    id: "Name",
    label: "Name",
  },

  {
    id: "Amount",
    label: "Amount",
  },
  {
    id: "Payment Status",
    label: "Payment Status",
  },
];
export default function PaymentHistoryMechanic() {
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
  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    const Id = localStorage.getItem("Id");
    console.log("id-->", Id);
    const res = await getApihandler(`/getPaymentHistory/mechanicId_${Id}`);
    console.log("res-->", res);
    if (res.status === 200) {
      setData(res.data);
    }
  };
  return (
    <Layout>
      <br />
      <h4>Payment History</h4>
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

                        <TableCell>{val.userName}</TableCell>

                        <TableCell>{val.amount}</TableCell>
                        <TableCell>Payment Completed</TableCell>
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
    </Layout>
  );
}
