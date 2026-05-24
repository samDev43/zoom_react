import axios from "axios";
// import { useState } from "react";

export async function upLoadImage(e)  {
    const file = e.target.files[0];
    if(!file){
        alert("Please select an image file.");
        return;
    }
    const formData = new FormData();
    formData.append("image", file);
    const token = localStorage.getItem("token");
    try{
        const res = await axios.post("http://localhost:5000/api/auth/action/uploadprofilepicture", formData, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    console.log(res.data);
    // const user = JSON.parse(localStorage.getItem("user"));
    // user.profile = res.data.imag;
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    }catch(err){
        console.log(err.response.data);
    }
    
} 

