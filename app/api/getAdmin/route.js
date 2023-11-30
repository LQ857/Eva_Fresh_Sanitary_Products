import { DBconnect } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const {name} = await req.json()
        await DBconnect();
        const user = await User.findOne({ name }).select('admin');
        return NextResponse.json({admin: user.admin});
    }catch(error){
        console.log("error",error)
        return NextResponse.json({message: "Internal Server Error"},{status: 500})
    }
}