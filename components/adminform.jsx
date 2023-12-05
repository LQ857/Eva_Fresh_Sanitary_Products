"use client";
import React from "react";
import Nav from "@/app/nav/page";
import { useState, useEffect } from "react";
import axios from "axios";
import "@/app/src/admin.css";

const Adminform = () => {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  return (
    <body>
      <Nav />
    </body>
  );
};

export default Adminform;
