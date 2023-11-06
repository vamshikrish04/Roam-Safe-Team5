import React from "react";
import { Container, Grid, Button, TextField } from "@mui/material";
import { getApihandler, postApihandler } from "../Apihandler";
import { useEffect } from "react";
import Layout from "../Layout/layout";

import { Link, useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

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
export default function ChatUserAdmin() {
  // useState

  const [message, setMessage] = React.useState("");
  const [messageSent, setMessageSent] = React.useState(0);
  console.log("message - ", message);

  const [messageText, setMessageText] = React.useState([]);
  console.log("messageText - ", messageText);
  const { register, handleSubmit, reset } = useForm();

  const [userId, setUserId] = React.useState();
  // console.log("userId - ", userId);

  // useEffect

  // useEffect
  useEffect(() => {
    setUserId(localStorage.getItem("Id"));
    getMessages();
  }, []);
  const getMessages = async () => {
    const UserId = localStorage.getItem("Id");
     console.log("UserId--->", UserId);
    const response = await getApihandler(
      `/getUserAdminChat/${UserId}/650eb5bb27b687851e997669`
    );
    console.log("get message response----->", response);
    if (response.status === 200) {
      setMessageText(response.data);
    }
  };

  const onSubmit = async (value) => {
    const UserId = localStorage.getItem("Id");
   
    const response = await postApihandler(
      `/sendUserAdminText/${UserId}/650eb5bb27b687851e997669`,
      {
        type: "User",
        text: message,
      }
    );
    console.log("send message resp - ", response);
    if (response.status === 200) {
      setMessageSent(Math.random());
      setMessage("");
      getMessages();
    } else {
      swal("Sorry!", `${response.error.response.data.message}`, "error");
    }}}
  
