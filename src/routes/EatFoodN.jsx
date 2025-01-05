import { useMutation } from "@tanstack/react-query";
import { eatFood } from "../services/foodService";
import { useState } from "react";
import { refreshUser } from "../services/userContextService";
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import FoodSearch from "./FoodSearchN";

/* eslint-disable react/prop-types */
const EatFood = () => {
    const [, setUser] = useUserContext();
    const [amount, setAmount] = useState(0);
    const [selectedFood, setSelectedFood] = useState(null)

    const navigate = useNavigate();

    const mutation = useMutation(eatFood, {
        onSuccess: async () => {
            await refreshUser(setUser);
            navigate('/');
        },
        onError: (error) => {
            console.error("Failed to log food:", error)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate({ food: selectedFood, amount: amount })
    }

    return (
        <div>
            {!selectedFood ? (
                <FoodSearch
                    onFoodSelect={setSelectedFood}
                />
            ) : (
                <div>
                    <form onSubmit={handleSubmit}>
                        <h2>{selectedFood.name}</h2>
                        <input
                            type="number"
                            name="amount"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <p>{selectedFood.unit}</p>
                        <input type="submit" value="Eat" />
                    </form>
                    <button onClick={() => { navigate("/search") }} >Back</button>
                </div>
            )}
        </div>


    )
}

export default EatFood;