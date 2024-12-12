import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../services/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const mutation = useMutation(login, {
        onSuccess: (data) => {
            console.log("Login sucessful")
        },
        onError: (error) => {
            console.log("Login error")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({email, password})
    }


    return (
        <div>  
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />                
                <input type="submit"  value={"Login"} />
            </form>
        </div>
    )
}

export default Login;