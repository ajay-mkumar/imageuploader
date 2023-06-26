import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DetailedImageContainer from '../components/DetailedImageContainer';

const DetailScreen = () => {
    const id=useParams().id;
    const [images,setImages]=useState([]);
    const sendRequest=async()=>{
        const res=await axios.post(`/api/post/${id}`).catch(err=>alert(err.response.data.error));
    
        const data=await res.data;

        return (data);
      }
      useEffect(()=>{
        sendRequest().then((data)=>setImages([data.data]))
        
      },[id])
      console.log(images)
      return (
        <div>
            {images && images.map(d=>(
            <DetailedImageContainer isUser={localStorage.getItem('user')==d.user._id} name={d.user.name} caption={d.caption} img={d.image} id={d._id} />
            ))}
            
        </div>
      )
}

export default DetailScreen