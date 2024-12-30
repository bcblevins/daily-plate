import { useMutation } from "@tanstack/react-query";
import { eatFood } from "../services/foodService";
import { useState } from "react";
import { refreshUser } from "../services/userContextService";
import { useUserContext } from "../hooks/useUserContext";
import { useLocation, useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const EatFood = () => {
    const [amount, setAmount] = useState(0);
    const [, setUser] = useUserContext();

    const location = useLocation();
    const food = location.state;
    const navigate = useNavigate();

    const mutation = useMutation(eatFood, {
        onSuccess: async () => {
            console.log("Food successfully logged. Refreshing user...")
            await refreshUser(setUser);
            navigate('/');
        },
        onError: (error) => {
            console.error("Failed to log food:", error)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("component food: " + JSON.stringify(food))
        mutation.mutate({ food: food, amount: amount })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>{food.name}</h2>
                <input type="number" name="amount" onChange={(e) => setAmount(e.target.value)} />
                <p>{food.unit}</p>
                <input type="submit" value="Eat" />
            </form>
            <button onClick={() => {navigate("/search")}} >Back</button>
        </div>

    )
}

export default EatFood;