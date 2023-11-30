import { DBconnect } from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export default async function GET(res){
    await DBconnect;
    
}