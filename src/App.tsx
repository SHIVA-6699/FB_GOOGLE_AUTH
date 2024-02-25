import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import { app } from "./config";
interface Form {
  name: string;
  email: string;
  password: string;
}
function App() {
  const [data, SetData] = useState<Form>({ name: "", email: "", password: "" });
  const [loading, SetLoading] = useState<boolean>(false);
  async function HandleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
   SetLoading(true);
    try {
      const database = getDatabase(app);
      const newPostRef = push(ref(database, "posts"));
      await set(newPostRef, data);
      alert("Successfully Submitted");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      SetLoading(false);
    }
  }
  function handlesetdata(e: ChangeEvent<HTMLInputElement>, type: keyof Form) {
    SetData({ ...data, [type]: e.target.value});
  }
  if (loading) {
    return <p>loading</p>;
  }
  return (
    <form onSubmit={HandleSubmit}>
      <label htmlFor="user">Enter Your User Name : </label>
      <input
        id="user"
        type="text"
        onChange={(e) => {
          handlesetdata(e, "name");
        }}
      />
      <div style={{ margin: "2rem" }}></div>
      <label htmlFor="email">Enter Your Email : </label>
      <input
        type="email"
        id="email"
        onChange={(e) => {
          handlesetdata(e, "email");
        }}
      />
      <div style={{ margin: "2rem" }}></div>
      <label htmlFor="pass">Enter Your Password : </label>
      <input
        type="password"
        id="pass"
        onChange={(e) => {
          handlesetdata(e, "password");
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
