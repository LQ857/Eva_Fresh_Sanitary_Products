import UserInfo from "@/components/dashboardform.jsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Dashboardform from "@/components/dashboardform.jsx";


export default async function dashboard() {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect("/login")
  }
  return <Dashboardform />;
}