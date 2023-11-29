import React from "react";
import { Container, Grid, Button, TextField } from "@mui/material";
import { getApihandler, postApihandler } from "../Apihandler";
import { useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

import swal from "sweetalert";
import AdminLayout from "../Layout";

export default function ChatUserAdmin() {
  // useState
  const { id } = useParams();
  console.log("id==>",id);
  const [message, setMessage] = React.useState("");
  const [messageSent, setMessageSent] = React.useState(0);
  console.log("message - ", message);

  const [messageText, setMessageText] = React.useState([]);
  console.log("messageText - ", messageText);
  const { handleSubmit } = useForm();

  const [userId, setUserId] = React.useState();
  // console.log("userId - ", userId);

  // useEffect

  // useEffect
  useEffect(() => {
    setUserId(localStorage.getItem("Id"));
    getMessages();
  }, []);
  const getMessages = async () => {
    
    const response = await getApihandler(
      `/getUserAdminChat/${id}/650eb5bb27b687851e997669`
    );
    console.log("get message response----->", response);
    if (response.status === 200) {
      setMessageText(response.data);
    }
  };

  const onSubmit = async (value) => {
    const response = await postApihandler(
      `/sendUserAdminText/${id}/650eb5bb27b687851e997669`,
      {
        type: "Admin",
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
    }
  };
  return (
    <AdminLayout>
      <Container style={{ marginTop: "50px", marginBottom: "80px" }}>
        <Grid container style={{ justifyContent: "center" }}>
          <Grid item>
           
          </Grid>
        </Grid>
        <h2
          style={{ textAlign: "start", padding: "10px", textAlign: "center" }}
          className="mt-5"
        >
          Chat Now
        </h2>
        <Grid container style={{ justifyContent: "center" }}>
          <Grid item>
            <Card
              sx={{
                minWidth: 350,
                maxHeight: 300,
                border: "1px solid green",
              }}
              className="my-4 p-4"
            >
              <CardContent
                style={{ maxHeight: 180, overflowY: "scroll" }}
                className="mb-4"
              >
                {messageText !== null &&
                  messageText !== undefined &&
                  messageText.map((val, ind) => {
                    return (
                      <Typography
                        sx={{ fontSize: 16, fontWeight: 600 }}
                        className={`text-${
                          val.type === "User" ? "end" : "start"
                        } text-${
                          val.type === "User" ? "dark" : "primary"
                        } mb-3`}
                        // color="text.primary"
                        // gutterBottom
                      >
                        {val.type === "User" ? "User." : "admin."}{" "}
                        &nbsp;&nbsp;&nbsp;
                        {val.text}
                      </Typography>
                    );
                  })}
              </CardContent>
              <CardActions>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid
                    container
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gridRowGap: "10px",
                    }}
                    className="align-items-end"
                  >
                    <Grid xs={6}>
                      <TextField
                        fullWidth
                        id="standard-basic"
                        type="text"
                        variant="standard"
                        value={message}
                        color="error"
                        placeholder="Type Your Message "
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Grid>
                    <Grid xs={6}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{
                          paddingLeft: "25px",
                          paddingRight: "25px",
                          textTransform: "capitalize",
                        }}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
}
