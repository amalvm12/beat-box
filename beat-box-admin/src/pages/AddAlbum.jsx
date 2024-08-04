import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { url } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';


const AddAlbum = () => {

  // state variables
  const [image , setImage] = useState(false);
  const [colour, setColour]= useState("#121212");
  const [name, setName] = useState("");
  const [ desc , setDesc] = useState("");
  const [ loading, setLoading]=useState(false);

  const onSubmitHandle = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('bgColor', colour);

      const response = await axios.post(`${url}/api/album/add`,formData);
      if(response.data.success){
        console.log(response);
        toast.success("Album added");
        setName("");
        setDesc("");
        setImage(false);

      }else{
       
        toast.error("Something went wrong");
        

      }

    } catch (error) {
      console.log(error);

      toast.error("Error occur")
      
    }
    setLoading(false);
  }


  return loading? (
    <div className='grid place-items-center min-h-[80vh]' >
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin '></div>

    </div>
  ) :(
    <form  onSubmit={ onSubmitHandle} className='flex flex-col items-start gap-8 test-gray-600'>
      <div className='flex flex-col gap-4'>
        <p>Upload Image</p>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden  />
        <label htmlFor="image">
          <img  className='w-24 cursor-pointer' src={image? URL.createObjectURL(image): assets.upload_area} alt="" />
        </label>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='bg-transparent outline-green-600 border-gray-600 border-2 p-2.5 w-[max(40w,250px)] ' type="text" placeholder='Type here' />
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Album Desription</p>
        <input onChange={(e)=>setDesc(e.target.value)} value={desc} className='bg-transparent outline-green-600 border-gray-600 border-2 p-2.5 w-[max(40w,250px)] ' type="text" placeholder='Type here' />
      </div>

      <div className='flex flex-col gap-3 '>
        <p>Backgroud Colour</p>
        <input onChange={(e)=>setColour(e.target.value)} value={colour} type="color" />
      </div>
      
      <button className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'  type='submit'> ADD</button>


    </form>
  )
}

export default AddAlbum