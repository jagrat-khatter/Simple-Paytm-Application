import React , {useState , useEffect} from 'react'

export function Appbar()
{
    return( <div className='shadow h-14 flex justify-between'>
            <div className='flex flex-col justify-center h-full ml-4 text-darkBlue-800'>
                JazzPay App
            </div>
            <div className="flex px-4">
                <div className='flex flex-col justify-center h-full mr-4 text-darkBlue-800'>
                    Hello 
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className='flex flex-col justify-center h-full text-xl text-darkBlue-800'> U </div>
                </div>
            </div>
    </div>)
}