import { PublicNav } from "../compoents/publicNav"
import { PublicBody } from "../compoents/pubicBody"
import  { isLoggedIn }  from "../compoents/auth"
import { useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export function Home(){
    const auth = isLoggedIn();
    const token = localStorage.getItem("token")
    const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        

    }, [user])
    
    useEffect(() => {
                const  getUserInfo = async () => {
                    try{
                         let res =  await axios.get(
                        "http://localhost:5000/api/auth/action/getuser",
                        {
                            headers: { "Authorization": `Bearer ${token}`},
                            withCredentials: true
                        }
                    );
                    setUser({
                            username: res.data.user.username,
                            email: res.data.user.email,
                            image: res.data.user.profile_Picture || null,
                            role: res.data.user.role,
                            currentUserId: res.data.user.id
                    })                    
                    }catch(err){
                        console.log(err.response.data.message);
                        if(err.response.data.message === "user not found"){
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                            console.log("work");
                            
                        }
                    }
                }
                if(token) getUserInfo()
            }, [token, setUser])

        return(
            <>
              <PublicNav auth={auth} user={user} />
              <PublicBody />
            </>
        )
    }

    
