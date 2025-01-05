import { useState } from "react";

function RecipeBuilder() {
    const [ingredients, setIngredients] = useState([])


    // TODO: FoodSearchN is now modular, but depends on EatFoodN to set amount.
    return (
        <div>
            <ul>
                {ingredients.map((i) => (
                    <li key={i.id} >{i.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeBuilder;