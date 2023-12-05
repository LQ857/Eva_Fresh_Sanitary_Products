import { NextResponse } from "next/server.js";
import User from "@/models/user";
import { DBconnect } from "@/libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, adminCode } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await DBconnect();
    const adminCodeValue = adminCode;
    const adminStatus = adminCodeValue === "LOUISXIVLETATCESTMOIFRONDE";

    const oripw = password;
    await User.create({
      name: name,
      email: email,
      originalPassword: oripw,
      password: hashedPassword,
      admin: adminStatus,
    });

    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    const response = NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
    return response;
  }
}
