import { useState } from "react";
import FoodSearch from "./FoodSearchN";

function RecipeBuilder() {
    const [ingredients, setIngredients] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [showFoodSearch, setShowFoodSearch] = useState(false)

    const handleAddFood = () => {
        setShowFoodSearch(true)
    }

    // TODO: 
    //      - FoodSearchN is now modular, but depends on EatFoodN to set amount.
    //      - Title of recipe shown at top as h1, editable if you click
    //      - Can add recipe instructions but don't show on this screen
    return (
        <div>
            {showFoodSearch ?
                (
                    <FoodSearch
                        onFoodSelect={setSelectedFood}
                    />
                ) : (
                    <div>

                        <ul>
                            {ingredients.map((i) => (
                                <li key={i.id} >{i.name}</li>
                            ))}
                        </ul>
                        <button onClick={handleAddFood} >Add Food</button>
                    </div>
                )
            }


        </div>
    );
}

export default RecipeBuilder;