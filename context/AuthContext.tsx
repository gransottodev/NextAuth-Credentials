import { createContext, useEffect, useState } from "react";
import {SignInRequest, GetById} from "../services/api";
import { setCookie, parseCookies} from 'nookies'
import Router from "next/router";


type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phoneNumber: number;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  SingIn: (data: SignInData) => Promise<void>;
}

type SignInData = {
  email: string;
  password: string;
}


export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }){
  const [user, setUser] = useState<User | null>(null)


  const isAuthenticated = !!user;

  useEffect(() => {
    const {'bank.Token': token} = parseCookies()

    if(token){
      GetById(token)
      .then(result => {
        setUser(result.data)
      })
    }
  }, [])


  async function SingIn({email, password} : SignInData) {
    const {token, user} = await SignInRequest(email,password)

    setCookie(undefined, 'bank.Token', token, {
      maxAge: 60 * 60 * 1 //1 Hour
    })

    setUser(user)

    Router.push('/dashboard')
  }


  return(
    <AuthContext.Provider value={{ user, isAuthenticated, SingIn}}>
      { children }
    </AuthContext.Provider>
  )
}
