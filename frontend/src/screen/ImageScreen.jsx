import React, { useEffect, useState } from 'react'
import ImageContainer from '../components/ImageContainer'

import axios from 'axios'
const ImageScreen = () => {


  const [images,setImages]=useState([]);

  const sendRequest=async()=>{
    const res=await axios.get('/api/post/').catch(err=>alert(err.response.data.error));

    const data=await res.data;

    return data;
  }
  useEffect(()=>{
    sendRequest().then(data=>setImages(data.data)).catch(err=>console.log(err))
    
  },[images])
  return (
    <div>
        {images && images.map(d=>(
        <ImageContainer isUser={localStorage.getItem('user')===d.user._id}  caption={d.caption} img={d.image} name={d.user.name} id={d._id} />
        ))}
        
    </div>
  )
}

export default ImageScreen