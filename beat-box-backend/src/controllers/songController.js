import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModels.js";


// add songs
const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {resource_type: "video"});
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
    const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`;

    console.log(name,desc,album,audioUpload,imageUpload,duration );

    const songData = {
        name,
        desc,
        album,
        image: imageUpload.secure_url,
        file :audioUpload.secure_url,
        duration
    }

    const song = songModel(songData);

    console.log(song);
    await song.save();
    res.status(200).json({success:true , message:"Song Added"})


   

  } catch (error) {
    // res.status(500).json({success:false , message:" song cant added"})
    console.log(error);
    
   
  }
};


// list songs
const listSong = async (req,res) => {
  try{
    const allsongs = await  songModel.find({});

    res.json({success:true , songs: allsongs});

  }catch (error){
    res.status(500).json({ success:false , message:"cant get songs"})
    console.log(error);

    

  }
};

// remove song
const removeSong = async (req, res)=>{

  try {

    await songModel.findByIdAndDelete(req.body.id);

    res.json({success:true , message:' Song removed'})
    
  } catch (error) {
    
    res.json({success:false});
    console.log(error);
  }

}


export { addSong, listSong, removeSong };
