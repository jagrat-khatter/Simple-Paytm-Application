import {useState , useEffect} from 'react' 
import axios from 'axios'
export function Balance(){
    const [balance , setBalance] = useState(null);

    useEffect(()=>{
        try{
            const token = "Bearer " + localStorage.getItem("token");
            const main = async ()=>{
                const response = await axios.get('http://localhost:3000/api/v1/account/balance' , {headers :{
                    Authorization : token
                }})
                if(response.data.balance) setBalance(response.data.balance);
            }
            main();
        }
        catch(err)
        {
            console.log('cannot fetch balances')
        }
    } , [])
    
    if(balance)
    return <div className="flex">
        <div className='font-bold text-lg text-darkBlue-800'>Your Balance</div>
        <div className='font-semibold text-lg ml-4 text-darkBlue-800'>{`$ ${balance}`}</div>
    </div>

}