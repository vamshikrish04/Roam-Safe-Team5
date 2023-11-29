import React from "react";
import {
 
  Container,
 
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { getApihandler, postApihandler } from "../Apihandler";
import { useEffect } from "react";
import Layout from "../Layout/layout";

import { Link,  useParams } from "react-router-dom";

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
export default function ChatUser() {
  const { clientId } = useParams();
  console.log("clientId - ", clientId);

  // useState
  
  const [message, setMessage] = React.useState("");
  const [messageSent, setMessageSent] = React.useState(0);
  console.log("message - ", message);
  const [data, setData] = React.useState([]);
  const [messageText, setMessageText] = React.useState([]);
  console.log("messageText - ", messageText);
  const { register, handleSubmit, reset } = useForm();
  console.log("data - ", data);
 
  const [userId, setUserId] = React.useState();
  console.log("userId - ", userId);
 

  

  // useEffect
  useEffect(() => {
    if (userId !== undefined && userId !== null) {
      getMechanicData();
    }
  }, [userId]);

  useEffect(() => {
    if (userId !== undefined && userId !== null) {
      getMessages();
    }
  }, [messageSent, userId]);

  // useEffect
  useEffect(() => {
    setUserId(localStorage.getItem("Id"));
  }, []);

  const getMechanicData = async () => {
    // const response = await getApihandler("/getAllUser/All");
    const response = await getApihandler(`/getAllMechanic/id_${clientId}`);

    console.log("reponse----->", response);
    if (response.status === 200) {
      setData(response.data);
    }
  };

  const getMessages = async () => {
    // console.log("get message url - ", `/getChat/${userId}/${clientId}`);
    const response = await getApihandler(`/getChat/${userId}/${clientId}`);
    // console.log("get message response----->", response);
    if (response.status === 200) {
      setMessageText(response.data);
    }
  };

  const onSubmit = async (value) => {
    const response = await postApihandler(`/sendText/${userId}/${clientId}`, {
      type: "User",
      text: message,
    });
    console.log("send message resp - ", response);
    if (response.status === 200) {
      // Swal.fire({
      //   position: "middle-centre",
      //   icon: "success",
      //   title: "Successfully Signup",
      //   showConfirmButton: false,
      //   timer: 2000,
      // });
      // history("/login");
      setMessageSent(Math.random());
    } else {
      swal("Sorry!", `${response.error.response.data.message}`, "error");
    }
  };
  return (
    <Layout>
      <Container style={{ marginTop: "50px", marginBottom: "80px" }}>
        <Grid container style={{ justifyContent: "center" }}>
          <Grid item>
            <Link to="https://zoom.us/" target="_blank">
              <Button
                variant="contained"
                color="error"
                sx={{
                  borderRadius: "10px",
                  fontSize: "20px",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  marginLeft: "30px",
                }}
              >
                Zoom Meeting
              </Button>
            </Link>
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
                        {val.type === "User" ? "User." : "Mechanic."} &nbsp;&nbsp;&nbsp;
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
                        color="error"
                        name="first_name"
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
    </Layout>
  );
}
