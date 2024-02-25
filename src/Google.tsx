import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./config";
import logo from "./assets/google.jpg";
import App from "./App";
import { useEffect, useState } from "react";
const Google = () => {
  const [value, Setvalue] = useState<string | null>("");
  const [loading, SetLoading] = useState<boolean>(false);
 async function handlesubmit() {
    SetLoading(true);
    try {
        const data = await signInWithPopup(auth, provider);
        Setvalue(data.user.email ?? "");
        localStorage.setItem("email", data.user.email ?? "");
    } catch (e) {
        console.log(e);
        // Handle error
    } finally {
        SetLoading(false);
    }
}
  useEffect(() => {
    Setvalue(localStorage.getItem("email"));
  }, []);

  return (
    <div>
      {value ? (
        <App />
      ) : (
        <button onClick={() => handlesubmit()} className="button-container">
          <img src={logo} alt="" width={230} height={50} className="img" />
          {loading && 
          <span
          className="spinner-border"
          role="status"
          aria-hidden="true"
          ></span>
        }
        </button>
      )}
    </div>
  );
};
export default Google;
