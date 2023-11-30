import { DBconnect } from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export default async function POST(res){
    await DBconnect;
    
}