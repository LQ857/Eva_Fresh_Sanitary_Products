import { DBconnect } from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await DBconnect();
        const products = await Product.find()
        return NextResponse.json({products})
    }catch(error){
        return NextResponse.json({message: "error during fetching"},{status: 500})
    }
}