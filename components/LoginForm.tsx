"use client";
import { useRouter } from 'next/navigation';
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/app/firebase';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginForm() {

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();

  const log = async () => {
    if(!canSubmit ){
      toast.error("Llene los campos")
    }else{
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password).then(
          res => {
            toast.success("Bienvenido "+(res.user.email) )
            localStorage.setItem('user', JSON.stringify(res.user));
            router.push('/admin');

          })
      } catch (error: any) {
        console.log(error.message);
        toast.error("Credenciales Inválidas")
      }
    }
   

  }

  const { ...allData } = data;

  const canSubmit = [...Object.values(allData)].every(Boolean);


  return (

    <form
      action=""
      className="w-3/4 h-72 flex flex-col items-center justify-between"
    >
      
      <h2 className="text-2xl font-light">Bienvenido</h2>
      <Input
        name="email"
        id="email"
        onChange={(e: any) => {
          setData({
            ...data,
            email: e.target.value
          });
        }}
        type="email" label="Email" fullWidth />
      <Input
        name="password"
        id="password"
        onChange={(e: any) => {
          setData({
            ...data,
            password: e.target.value
          });
        }}
        type="password" label="Contraseña" fullWidth />
      <Button
        onClick={log}
        color="success" fullWidth>
        Ingresar
      </Button>
    </form>
  );

}