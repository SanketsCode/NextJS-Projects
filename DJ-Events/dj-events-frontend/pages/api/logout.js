import { API_URL } from "@/config/index";
import cookie from 'cookie';

export default async (req,res) => {
    // console.log("working");
    if(req.method === 'POST'){

       //Destroy cookie
       res.setHeader('Set-Cookie',cookie.serialize(
        'token','',{
            httpOnly:true,
            secure:process.env.NODE_ENV !== 'development',
           expires:new Date(0),
            sameSite :'strict',
            path:'/'
        }
    ))

    res.status(200).json({message: 'Success'});

    }else{
        res.setHeader('Allow',['POST']);
        return res.status(405).json({message:`Method ${req.method} not allowed`})
    }
}