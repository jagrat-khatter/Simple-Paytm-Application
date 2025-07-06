import {useState , useEffect} from 'react'
import {Appbar} from '../components/Appbar'
import {Balance} from '../components/Balance'
import {Users} from '../components/Users'
import axios from 'axios'

export function Dashboard()
{
    
    return <div className='bg-background-500 min-h-screen flex flex-col'>
        <Appbar />
        <div className='m-8 flex-grow'>
            <Balance />
            <Users />
        </div>
        
    </div>
}