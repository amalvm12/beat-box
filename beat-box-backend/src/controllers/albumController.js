import {v2 as cloudinary } from 'cloudinary'
import albumModel from '../models/albumModel.js'



const addAlbum  = async ( req, res )=>{
    try {
        const name = req.body.name;
        const desc = req.body.name;
       const bgColor = req.body.bgColor;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type:"image"});


        const albumData = {
            name , 
            desc,
            bgColor,
            image:imageUpload.secure_url
        }

        const album = albumModel(albumData);
        console.log(album);
        await album.save();

        res.json({success:true , messsage:"Album Added"})

        
    } catch (error) {

       res.json({success:false , error: error.messsage})
       console.log(error);
        
    }

}

const listAlbum = async (req ,res )=>{

    try {
        
        const allAlbums = await albumModel.find({})
        console.log(allAlbums);
        res.json({success:true, albums:allAlbums})
    } catch (error) {

        res.json({success:false , message:"cant get album "})
        console.log(error);

        
    }

}

const removeAlbum = async ( req, res)=>{

    try {
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({success:true , message:"Album removed"})
    } catch (error) {
res.json({success:false , message:"cant find the album"})
    }

}


export { addAlbum, listAlbum, removeAlbum}


