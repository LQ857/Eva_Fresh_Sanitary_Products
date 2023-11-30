import React from 'react'
import Adminform from '@/components/adminform'
import { getServerSession } from "next-auth";
import Dashboard from '../dashboard/page.jsx';
import axios from 'axios';
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route.js";

export default async function Admin() {
  let admin;
  const session = await getServerSession(authOptions);
  if(!session) redirect("/login")
  try{
    const response = await axios.post("http://localhost:3000/api/getAdmin",{name: session?.user?.name});
    admin = response.data.admin;
  }catch(error){
    console.log(error);
  }

  if(!admin){
    redirect("/dashboard");
  }
  return (
    <Adminform />
);
}