export function InputBox({onChange , placeholder , label})
{
    return (<><div className="text-sm text-darkBlue-800 font-medium text-left py-2" >{label}</div>
                <input onChange={onChange} placeholder={placeholder} className='w-full px-2 py-1 border rounded border-slate-200' />
                </>)
}