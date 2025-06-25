import {useState , useEffect} from 'react'
import {Appbar} from '../components/Appbar'
import {Balance} from '../components/Balance'
import {Users} from '../components/Users'
import axios from 'axios'

export function Dashboard()
{
    
    return <div>
        <Appbar />
        <div className='m-8'>
            <Balance />
            <Users />
        </div>
        
    </div>
}