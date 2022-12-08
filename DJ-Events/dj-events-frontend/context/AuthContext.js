
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { API_URL, NEXT_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [error,setError] = useState(null);

    const router = useRouter();


    useEffect(() => {checkUserLoggedIn()},[]); 

    //Register user
    const register = async(user) => {
        const {username,email,password} = user;
        const res = await fetch(`${NEXT_URL}/api/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                username,password
            })
        });

        const data = await res.json();

        // console.log(data);
        if(res.ok){
            setUser(data.user);
            // console.log(user);
            router.push('/');
        }else{
            setError(data.message);

        }

    }

    //Login user
    const login = async ({email:identifier,password}) => {
        // console.log({identifier,password});
        const res = await fetch(`${NEXT_URL}/api/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                identifier,password
            })
        });

        const data = await res.json();

        // console.log(data);
        if(res.ok){
            setUser(data.user);
            // console.log(user);
            router.push('/');

        }else{
            setError(data.message);

        }

    } 

    //Log out user
    const Logout = async () => {
        const res = await fetch(`${NEXT_URL}/api/logout`,{
            method:'POST', 
        });

        if(res.ok){
            setUser(null);
            router.push('/');
        }
    }

    //check if user logged in
    const checkUserLoggedIn = async () => {
        const res = await fetch(`${NEXT_URL}/api/user`);
        const data = await res.json();

        if(res.ok){
            setUser(data.user);
            router.push('/accounts/dashboard')
        }else{
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{user,error,register,login,Logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;