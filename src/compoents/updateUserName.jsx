import axios from "axios"
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../UserContext";

// const { user } = useContext(UserContext);

export async function updateUserName(newUserName){
    
    const token = localStorage.getItem("token");

    try{
       await axios.put("https://zoom-node-crhn.onrender.com/api/auth/action/updateusername", { username: newUserName }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    toast.success("Username updated successfully!");    
    }catch(err){
        toast.error("Failed to update username.");
        console.log(err);
    }
}

export async function updateEmail(newEmail){
    const token = localStorage.getItem("token");

    try{
       await axios.put("https://zoom-node-crhn.onrender.com/api/auth/action/updateemail", { email: newEmail }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    toast.success("Email updated successfully!");    
    }catch(err){
        toast.error("Failed to update email.");
        console.log(err);

    }
}

export async function updatePassword(newPassword){
    let token = localStorage.getItem("token");
    
    try{
       await axios.put("https://zoom-node-crhn.onrender.com/api/auth/action/updatepassword", { password: newPassword }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    toast.success("Password updated successfully!");    
    }catch(err){
        toast.error("Failed to update password.");
        console.log(err);
    }
}

export async function deleteAccount(AccountId, role, setUsers){
    const token = localStorage.getItem("token");

    console.log(role);
    
    try{
        const res = await axios.delete(`https://zoom-node-crhn.onrender.com/api/auth/action/deleteAccount/${AccountId}`, {
            headers: { "Authorization": `Bearer ${token}` },   
        });
        if(res.data.status === "success"){
            if(role !== "admin"){
                window.location.href = "/";
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            setUsers(prevUsers => prevUsers.filter(user => user._id !== AccountId));
            toast.success("Account deleted successfully!");
        }
        console.log(res.data);
        
    }catch(err){
        console.log(err.response); 
        toast.error("Failed to delete account.");
    }

}