import Uploadform from "@/components/uploadform.jsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route.js";

export default async function Uploads() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return <Uploadform />;
}
