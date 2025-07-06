import React , {useState , useEffect} from 'react'
import axios from 'axios'
import {useNavigate}  from 'react-router-dom'
import {Button} from './Button'

export function Users(){

    
    const [users  ,  setUsers] = useState(null);
    const [filter , setFilter] = useState("");

    useEffect(()=>{
       try{
            const main = async ()=>{
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`);
                
                if(response.data.users){
                    setUsers(response.data.users);
                }
            }
            main();
       } 
       catch(err){
        console.log("cannot fetch the users")
       }
        
    } , [filter])

    return(<>
            <div className='font-bold mt-6 text-lg text-darkBlue-800'>
                Users
            </div>
            <div className='my-2'>
                <input onChange={(e)=>{setFilter(e.target.value)}} type='text' placeholder='Search users...'
                className='w-full px-2 py-1 border rounded border-slate-200'></input>
            </div>
            <div>
                {users && users.map((x)=><User info={x} />)}
            </div>
    </>)
    
}


function User({info}){
    const navigate = useNavigate();

    return (
    <div className='flex justify-between'>
        <div className='flex'>
            <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
                <div className='flex flex-col justify-center h-full text-xl'>
                    {info.firstName[0] +''+ info.lastName[0]}
                </div>
            </div>
            <div className='flex flex-col justify-center h-full'>
                <div>
                    {info.firstName} {info.lastName}
                </div>
            </div>
        </div>
        <div className='flex flex-col justify-center h-full'>
            <Button onClick={()=>{
                navigate('/send' ,{
                    state : {
                        userId : info._id ,
                        firstName : info.firstName ,
                        lastName : info.lastName
                    }
                })
            }} label={'Send Money'}/>
        </div>
    </div>)
}