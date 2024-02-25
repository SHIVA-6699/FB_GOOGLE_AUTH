import { signInWithPopup } from "firebase/auth";
import { auth,provider } from "./config";
import App from "./App";
import { useEffect, useState } from "react";
const Google = () => {
    const [value, Setvalue] = useState<string | null>("")
    function handlesubmit() {
        signInWithPopup(auth, provider).then((data) => {
            Setvalue(data.user.email ?? "")
            localStorage.setItem("email", data.user.email ?? "")
        })
    }
    useEffect(()=>{
        Setvalue(localStorage.getItem("email"))
    },[])
    return <div>
        {value ? <App/> : 
        <button onClick={() => handlesubmit()}>sign with google</button>
        }
        
    </div>;
};
export default Google;
