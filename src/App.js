import { useState } from "react";
import Admin from "./Admin";
import CustomerLogin from "./CustomerLogin";

export default function App() {
  const path = window.location.pathname;
  if (path === "/admin") return <Admin />;
  return <CustomerLogin />;
}
