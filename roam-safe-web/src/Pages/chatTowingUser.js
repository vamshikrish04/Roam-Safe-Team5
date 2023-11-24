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
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { getApihandler, postApihandler } from "../Apihandler";
import { useEffect } from "react";
import Layout from "../Layout/layout";
import { useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import swal from "sweetalert";

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
    id: "mobile",
    label: "",
  },
];
export default function ChatTowingUser() {
  const { clientId } = useParams();
  console.log("clientId - ", clientId);

  // useState
  const [page, setPage] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [messageSent, setMessageSent] = React.useState(0);
  console.log("message - ", message);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [messageText, setMessageText] = React.useState([]);
  console.log("messageText - ", messageText);
  const { register, handleSubmit, reset } = useForm();
  console.log("data - ", data);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [userId, setUserId] = React.useState();
  console.log("userId - ", userId);
  let history = useNavigate();

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  