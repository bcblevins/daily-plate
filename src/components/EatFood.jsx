import { useMutation } from "@tanstack/react-query";
import { eatFood } from "../services/foodService";
import { useState } from "react";

/* eslint-disable react/prop-types */
const EatFood = ({food}) => {
    const mutation = useMutation(eatFood)

    const [amount, setAmount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("component food: " + JSON.stringify(food))
        mutation.mutate({ food: food, amount: amount })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{food.name}</h2>
            <input type="number" name="amount" onChange={(e) => setAmount(e.target.value)} />
            <p>{food.unit}</p>
            <input type="submit" value="Eat"/>

        </form>
    )
}

export default EatFood;