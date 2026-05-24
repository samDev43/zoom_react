import axios from "axios"   
import { useState } from "react";
import z from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

  const commentSchema = z.object({
    comment : z.string().nonempty("comment is required").min(1, "Input should not be empty"),
  })

export function Comment({ postId, setComments  }) {
    const [ comment, setComment ] = useState("");
    const navigate = useNavigate();

    async function postComment(){
        const result = commentSchema.safeParse({ comment });
        
        if (!result.success) {
            toast.error("Invalid comment");
            return;
        }
        let token =  localStorage.getItem("token");
        if(!token){
            toast.error("You need to login to post a comment");
            return;
        }
        try{
            
            const res = await axios.post(
                "http://localhost:5000/api/auth/action/postComment",
                { comment, postId },
                {
                    headers : { "Authorization" : `Bearer ${token}` }
                },  
                
                
            )
            if(res.data.status === "success"){
                setComments(res.data.comment);
                setComment("")
            }else{
                toast.error(res.data.message || "Failed to post comment");
                setComment("")
                setTimeout(() => {
                    navigate("/login");
                }, 1500)
            }
            
        }catch (err) {
            console.log(err);
            toast.error("An error occurred while posting the comment. Please try again.");
        }

    }

    return(
        <>
         <div className="fixed bottom-0 left-0 right-0 flex justify-center px-3 pb-20">
            <div className="w-full max-w-2xl flex items-center gap-2 bg-[#23252e] rounded-full px-3 py-2">
                
                <i className="bi bi-chat-left-fill text-white"></i>

                <input
                className="flex-1 bg-transparent text-white outline-none px-2"
                type="text"
                placeholder="Post your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                />

                <button 
                onClick={postComment}
                className="w-9 h-9 flex justify-center items-center rounded-full bg-white cursor-pointer hover:bg-gray-200 transition"
                >
                <i className="bi bi-arrow-up text-black"></i>
                </button>

            </div>
        </div>
        </>
    )
}