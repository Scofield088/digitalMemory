import axios from "axios";
import { BACKEND_URL } from "../config";
import { useContent } from "../hooks/useContent";

export async function Delete(title:any){
        
        await axios.delete(`${BACKEND_URL}/api/v1/content`, {
            data: {
                title,
            },
            headers: {
                "token": localStorage.getItem("token") 
            }
        })

        useContent();
}