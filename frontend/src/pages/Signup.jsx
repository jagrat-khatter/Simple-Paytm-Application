import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {Heading} from '../components/Heading'
import {Subheading} from '../components/Subheading'
import {Button} from '../components/Button'
import {BottomWarning} from '../components/BottomWarning'
import {InputBox} from '../components/InputBox'

export function Signup()
{
    const [firstName , setFirstName] = useState(null);
    const [lastName , setLastName] = useState(null);
    const [password , setPassword] = useState(null);
    const [username , setUsername] = useState(null);
    const [message , setMessage] = useState(null);
    const [messageClr , setMessageClr] = useState(null);
    const navigate = useNavigate();

    return (<>
    <div className='h-screen bg-background-500 flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign Up"}/>
            <Subheading label={"Enter your credentials to access your account"} />
            <InputBox placeholder={"Jagrat"} onChange={(e)=>{setFirstName(e.target.value)}} label={"First Name"}/>
            <InputBox placeholder={"Khatter"} onChange={(e)=>{setLastName(e.target.value)}} label={"Last Name"}/>
            <InputBox placeholder={"khatterjagrat@gmail.com"} onChange={(e)=>{setUsername(e.target.value)}} label={"Email"}/>
            <InputBox placeholder={"123456"} onChange={(e)=>{setPassword(e.target.value)}} label={"Last Name"}/>
            {message && <div className={`${messageClr} py-2`}>{message}</div>}
            <div className="pt-4">
                <Button onClick={async () => {
                    try{const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username,
                    firstName,
                    lastName,
                    password
                    });
                    console.log(response.data);
                    if(response.data.message === "User created successfully")  {
                        setMessageClr("text-green-600");
                        setMessage(response.data.message);

                        setTimeout(()=> {navigate('/signin')} , 2000);
                        
                    }
                    }
                    catch(err){
                        setMessageClr("text-red-600");
                        console.log(err.response.data.message);
                        if(err.response && err.response.data.message){
                            setMessage(err.response.data.message);
                        }
                        else setMessage("Signup Failed");
                    }
                    
                    
                }} label={"Sign Up"} />
            </div>
            <BottomWarning label={"Already have an account? "} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
    </>)
}