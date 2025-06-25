import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from "axios"

import {Heading} from '../components/Heading'
import {Subheading} from '../components/Subheading'
import {Button} from '../components/Button'
import {BottomWarning} from '../components/BottomWarning'
import {InputBox} from '../components/InputBox'


export function Signin()
{
    const [username , setUsername] = useState(null);
    const [password , setPassword] = useState(null);
    const [message , setMessage] = useState(null);
    const navigate = useNavigate();

    return (<>
    <div className={"bg-background-500 h-screen flex justify-center"}>
        <div className={"flex flex-col justify-center"}>
            <div className={"rounded-lg bg-white w-80 text-center p-2 h-max px-4"}>
                <Heading label={"Sign In"} />
                <Subheading label={"Enter your credentials to access your account"} />
                <InputBox onChange={(e)=>{setUsername(e.target.value)}} placeholder={"khatterjagrat@gmail.com"} label={'Email'} />
                <InputBox onChange={(e)=>{setPassword(e.target.value)}} placeholder={"123456"} label={'Password'} />
                {message && <div className={`text-red-600 py-2`}>{message}</div>}
                <div className={"pt-4"}>
                    <Button onClick={async ()=>{
                        try{
                            const response =await  axios.post('http://localhost:3000/api/v1/user/signin' , {
                                username : username ,
                                password : password
                            })
                            if(response.data.token){
                                console.log("signin");
                            }
                            localStorage.setItem('token' , response.data.token);
                            navigate('/dashboard')
                            
                        }
                        catch(err){
                            console.log(err.response.data);
                            setMessage('Incorrect username or password. Please try again.')
                        }
                    } } label="Sign In" />
                </div>
                <BottomWarning label={"Don't have an account ?"} buttonText={'Sign up'} to={'/signup'} />
            </div>
        </div>
    </div>
    </>)
}