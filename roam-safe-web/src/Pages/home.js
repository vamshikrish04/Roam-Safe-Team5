import React, { useEffect, useState } from "react";
import { putApihandler } from "../Apihandler";
import Banner from "../Components/Home/banner";
import OurServices from "../Components/Home/our-services";
import Vendor from "../Components/Home/vendor";
import Welcome from "../Components/Home/welcome";
import Layout from "../Layout/layout";

export default function Home() {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [IdUser,setIdUser]=useState("");
  console.log("IdUser-->", IdUser);
  useEffect(() => {
    let user = localStorage.getItem("UserName");
    let IdUser = localStorage.getItem("Id");
    setIdUser(IdUser);
    if (user) {
      currentPosition();
    }
  }, []);
  useEffect(() => {
    putLocation();
  }, [long]);

  const putLocation = async () => {
    let id = localStorage.getItem("Id");
    const user = localStorage.getItem("Cheak");
    const array = {
      latitude: lat,
      longitude: long,
    };
    console.log("array--->", array);
    console.log("id--->", id);
    console.log("user--->", user);
    if (user === "0") {
      console.log("hi");
      const response = await putApihandler(`/addUserLatLong/${id}`, array);
      console.log("response-------------->", response);
    } else if (user === "1") {
      const response = await putApihandler(`/addMechanicLatLong/${id}`, array);
      console.log("response-------------->", response);
    } else if (user === "2") {
      const response = await putApihandler(
        `/addTowingProviderLatLong/${id}`,
        array
      );
      console.log("response-------------->", response);
    }
  };
  const currentPosition = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  };
  return (
    <Layout>
      <Banner />
      <Welcome />
      <OurServices />
      {IdUser === null ? <Vendor />:""}
     
    </Layout>
  );
}
