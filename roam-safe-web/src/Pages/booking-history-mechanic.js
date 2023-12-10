import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Layout from "../Layout/layout";
import BookingHistoryRagular from "./booking-history-ragular";
import BookingHistoryEmergency from "./booking-history-emergency";

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

export default function BookingHistoryMechanic() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <h2 style={{ textAlign: "start", padding: "10px" }}>Booking History</h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Regular" {...a11yProps(0)} />
            <Tab label="Emergency" {...a11yProps(1)} />
         
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
         <BookingHistoryRagular/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
         <BookingHistoryEmergency/>
        </CustomTabPanel>
    
      </Box>
    </Layout>
  );
}
