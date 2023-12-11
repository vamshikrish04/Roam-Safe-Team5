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
export default function PaymentHistoryTowing() {
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
    const res = await getApihandler(`/getPaymentHistory/towingId_${Id}`);
    console.log("res-->", res);
    if (res.status === 200) {
      setData(res.data);
    }
  };
}
