import Paymentform from "@/components/paymentform.jsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Pay() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return <Paymentform />;
}
