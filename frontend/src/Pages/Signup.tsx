import axios from "axios";
import { useRef } from "react";
import { Button } from "../components/Button.tsx";
import { Input } from "../components/Input.tsx";
import { BACKEND_URL } from "../config.ts";
import { useNavigate } from "react-router-dom";


export function Signup(){
    const UsernameRef=useRef<HTMLInputElement>(null);
    const PasswordRef=useRef<HTMLInputElement>(null);
    const navigate=useNavigate()
    async function signup(){
        const username=UsernameRef.current?.value
        const password=PasswordRef.current?.value
        try{
        await axios.post(BACKEND_URL +"/api/v1/signup",{
                username,
                password
        })
        navigate("/signin")
        alert("you have signedup")
    }catch(e){
        alert(e)
        // alert("error in signingup")
    }
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input ref={UsernameRef} placeholder="Username"/>
            <Input ref={PasswordRef} placeholder="Password"/>
            <div className="flex justify-center pt-4">
                <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true} startIcon={undefined} />
            </div>
        </div>
    </div>
}