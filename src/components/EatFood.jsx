import { useMutation } from "@tanstack/react-query";
import { eatFood } from "../services/foodService";

/* eslint-disable react/prop-types */
const EatFood = ({food}) => {
    const mutation = useMutation(eatFood)
    const handleSubmit = () => {
        const foodEntry = {
            food_id: food.id,
            amount: food.amount
        }
        mutation.mutate(foodEntry)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{food.name}</h2>
            <input type="number" name="amount" />
            <p>{food.unit}</p>
            <input type="submit" value="Eat"/>

        </form>
    )
}

export default EatFood;