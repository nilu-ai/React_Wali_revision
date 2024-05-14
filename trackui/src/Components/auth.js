import { useEffect } from "react";
import { currentme } from "../utils/api_utils";
import axios from "axios";

const Authadmin =({childern})=>{
    const i=1;
    //
    useEffect(()=>{
       // currentme();
        axios.get("https://obscure-space-chainsaw-qx4rp45qrvvf4pvv-9000.app.github.dev/user/login/Nilesh/passworddd")
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
    },[])
    return (i==1 ? <childern/> : <h1>Not Authorised</h1>)
}

export default Authadmin;