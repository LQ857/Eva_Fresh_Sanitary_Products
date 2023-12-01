import { DBconnect } from "@/libs/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        await DBconnect();
        const {name,description,price} = await req.json()
        const fileNumbers = uploadutils.getFileCount();
        const inputFiles = [];
        const outputFolderPath = './public/plantspic/';
      
        const product = new Product({
            name: name,
            description: description,
            price: price,
          pictures: fileNumbers,
          pictureUrl: []
        });
        console.log(post);
      
        if (req.files && req.files.length >= 1) {
            req.files.forEach(function (file) {
              post.pictureUrl.push({
                filename: file.filename,
                originalname: file.originalname,
                path: file.path,
                size: file.size
              });
              inputFiles.push('./public/uploads/'+file.filename);
            });
          }
          imageCompressor.compressImages(inputFiles,outputFolderPath);
      
        await post.save();
        }catch(error){
          console.log(error, "uploading problems")
        }
    try{
        await DBconnect();
    const {name,description,price} = await req.json()
    Product.create({
        name,
        description,
        price
    })
    return NextResponse.json({message: "Product created"},{status: 201})
    }catch(error){
        console.log("error",error)
        return NextResponse.json({error},{status: 500})
    }
}