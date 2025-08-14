import {useRef} from "react"
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin(){
    const UsernameRef=useRef<HTMLInputElement>(null)
    const PasswordRef=useRef<HTMLInputElement>(null)
    const navigate=useNavigate()
    async function signin(){
        const username=UsernameRef.current?.value
        const password=PasswordRef.current?.value
        try{
        const res=await axios.post(BACKEND_URL+"/api/v1/signin",{
            username,
            password
        })
        const jwt=res.data.token
        localStorage.setItem("token",jwt)
        navigate("/dashboard")
        alert("signed in")
    }catch(e){
        alert("error in signing in" + e)
    }
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input ref={UsernameRef} placeholder="Username"/>
            <Input ref={PasswordRef}  placeholder="Password"/>
            <div className="flex justify-center pt-4">
                <Button onClick={signin} loading={false} variant="primary" text="Signin" fullWidth={true} />
            </div>
        </div>
    </div>
}

