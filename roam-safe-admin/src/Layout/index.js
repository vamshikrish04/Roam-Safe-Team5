import React from "react";
import LayoutTemplate from "./LayoutPage/sidenav";

const AdminLayout = ({ children }) => {
  return <LayoutTemplate>{children}</LayoutTemplate>;
};

export default AdminLayout;
