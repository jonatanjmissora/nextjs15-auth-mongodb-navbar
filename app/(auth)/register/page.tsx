"use client"

import Link from 'next/link';
import { useActionState, useState } from "react";
import CloseEyeSVG from '../../_assets/CloseEyeSVG';
import OpenEyeSVG from '../../_assets/OpenEyeSVG';
import { register } from '@/app/_actions/user.action';
import Input from '@/app/_components/Input';
import Loading_Dots from '@/app/_components/Loading_Dots';

export default function RegisterPage() {

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formState, formAction, isPending] = useActionState(register, null);

  return (
    <div className='w-[90%] sm:w-[20rem] h-full flex justify-center items-center'>

      <form action={formAction} className='flex flex-col justify-center items-center gap-6 w-full sm:scale-75 2xl:scale-100'>

        <h2 className='text-xl font-semibold text-left w-full'>Registra tus datos</h2>
        
        <div className='w-full flex flex-col gap-2'>

          <Input 
            label='username' 
            placeholder="usuario"
            defaultValue={formState?.prevState?.username} 
            className='w-full'
          />
          
          <p className='text-orange-500 italic min-h-6 text-right'>{formState?.errors.username}</p>
          
          <div className='relative flex items-center justify-center w-full'>

            <Input 
              label='userpassword' 
              placeholder="contraseña"
              defaultValue={formState?.prevState?.userpassword} 
              className='w-full'
              type={showPassword ? "text" : "password"}
            />

            <button className="p-2 absolute right-4" type="button" onClick={() => setShowPassword(prev => !prev)}>
              {showPassword 
                ? <CloseEyeSVG className='size-6 pt-1 text-slate-700' currentColor='currentColor' /> 
                : <OpenEyeSVG className='size-6 text-slate-700' currentColor='currentColor' />}
            </button>

          </div>
          
          <p className='text-orange-500 italic min-h-6 text-right'>{formState?.errors.userpassword}</p>
        
        </div>
        
        <button className='btn-primary w-full'>{isPending ? <Loading_Dots /> : "Registrar"}</button>

        <div className="w-full flex justify-end">
          <Link className='link' href="/login">Ingresa</Link>
        </div>

      </form>
    </div>
  )
}
