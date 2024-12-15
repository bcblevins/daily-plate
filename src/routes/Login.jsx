import { useMutation } from "@tanstack/react-query";
import { useState, useContext } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router";
import { UserContext } from "../components/contexts"
import { getUser } from "../services/userService";

const Login = () => {
    // State variables are dynamic, normal variables are not. The user can manipulate these variables, so we should use useState()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginFail, setLoginFail] = useState(false);
    const [user, setUser] = useContext(UserContext)

    // Used to change route
    const navigate = useNavigate();

    const mutation = useMutation(login, {
        onSuccess: async (data) => {
            console.log("Login successful")
            console.log(data)
            console.log(await fetchUser())
            navigate('/')
        },
        onError: (error) => {
            console.log("Login error: " + error)
            setLoginFail(true);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginFail(false)
        mutation.mutate({ email, password })
    }

    const fetchUser = async () => {
        let userData = await getUser()
        setUser(userData)
        return userData;
    }

    return (
        <div>
            <h1>DailyPlate</h1>
            {/* Conditional element here */}
            {loginFail && <div>Email or password incorrect.</div>}
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
                <input type="submit" value={"Login"} />
            </form>
        </div>
    )
}

export default Login;