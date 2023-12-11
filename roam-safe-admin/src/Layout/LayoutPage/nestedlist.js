import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from "@mui/icons-material/Person";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ConstructionIcon from "@mui/icons-material/Construction";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import ChatIcon from "@mui/icons-material/Chat";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function NestedList() {
  // const [open, setOpen] = React.useState(false);
 
  // const handleClick = () => {
  //   setOpen(!open);
  // };
  React.useEffect(() => {}, []);
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Link to="/users">
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon sx={{ color: "#EE4848" }} />
          </ListItemIcon>
          <ListItemText
            className="sideNav-tab"
            primary="Users"
            sx={{ color: "black" }}
          />
        </ListItemButton>
      </Link>
      <Link to="/mechanics">
        <ListItemButton>
          <ListItemIcon>
            <ConstructionIcon sx={{ color: "#EE4848" }} />
          </ListItemIcon>
          <ListItemText
            className="sideNav-tab"
            primary="Mechanics"
            sx={{ color: "black" }}
          />
        </ListItemButton>
      </Link>
      <Link to="/towing">
        <ListItemButton>
          <ListItemIcon>
            <CarRepairIcon sx={{ color: "#EE4848" }} />
          </ListItemIcon>
          <ListItemText
            className="sideNav-tab"
            primary="Towing"
            sx={{ color: "black" }}
          />
        </ListItemButton>
      </Link>
      <Link to="/services">
        <ListItemButton>
          <ListItemIcon>
            <MiscellaneousServicesIcon sx={{ color: "#EE4848" }} />
          </ListItemIcon>
          <ListItemText
            className="sideNav-tab"
            primary="Services"
            sx={{ color: "black" }}
          />
        </ListItemButton>
      </Link>
      {/* <Link to="/model">
        <ListItemButton>
          <ListItemIcon>
            <DirectionsCarIcon sx={{ color: "#EE4848" }} />
          </ListItemIcon>
          <ListItemText
            className="sideNav-tab"
            primary="Model"
            sx={{ color: "black" }}
          />
        </ListItemButton>
      </Link> */}
      <Link to="/contact">
        <ListItemButton>
          <ListItemIcon>
            <ContactPageIcon sx={{ color: "#EE4848" }} />
          </ListItemIcon>
          <ListItemText
            className="sideNav-tab"
            primary="Contact"
            sx={{ color: "black" }}
          />
        </ListItemButton>
      </Link>

      <Link to="/chat-all">
        <ListItemButton>
          <ListItemIcon>
            <ChatIcon sx={{ color: "#EE4848" }} />
          </ListItemIcon>
          <ListItemText
            className="sideNav-tab"
            primary="Chat"
            sx={{ color: "black" }}
          />
        </ListItemButton>
      </Link>
    </List>
  );
}
