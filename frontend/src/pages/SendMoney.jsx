import {useState , useMemo , useRef , useEffect} from 'react'
import {useLocation , useNavigate} from 'react-router-dom'
import axios from 'axios'


export function SendMoney()
{
    const location  = useLocation();
    const {userId , firstName , lastName} = location.state || {};
    const [amount , setAmount] = useState(0);
    const [status , setStatus] = useState(null);
    const ref1 = useRef();
    const navigate = useNavigate()

    const avatarColor  = useMemo(()=>{
        const colors =[
            'bg-green-500',
            'bg-blue-500' ,
            'bg-purple-500' ,
            'bg-red-500' ,
            'bg-yellow-500' ,
            'bg-indigo-500'
        ];
        return colors[Math.floor(Math.random() * colors.length)]
    } , [firstName])

    useEffect(()=>{
        console.log(status);
        if(status === true){
            ref1.current.innerHTML = '<div style="color: green; font-size: 24px;">Transfer Successful!</div>';
            setTimeout(()=>{
            navigate('/dashboard')
            } , 1000)
        }
        

    } , [status])

    return (
    <div ref={ref1} className='flex justify-center h-screen bg-background-500'>
        <div className='h-full flex flex-col justify-center'>
            <div className='border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg'>
                <div className='flex flex-col space-y-1.5 p-6'>
                    <h2 className='text-3xl font-bold text-center'>
                        Send Money 
                    </h2>
                    <div className='p-6' >
                        <div className='flex items-center space-x-4'>
                            <div className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center`}>
                            <span className="text-2xl text-white">{firstName[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{firstName}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    for="amount"
                                >
                                    Amount (in $)
                                </label>
                                <input
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button onClick={async () => {
                                const response =await  axios.post("http://localhost:3000/api/v1/account/transfer", {
                                    to: userId,
                                    amount : amount
                                }, {
                                    headers: {
                                        Authorization: "Bearer " + localStorage.getItem("token")
                                    }
                                })
                                if(response.data.message === "Transfer successful"){
                                    setStatus(true);
                                }
                            }} className={`justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full ${avatarColor} text-white`}>
                                Initiate Transfer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}