import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchAllFoods } from "../services/foodService";
import EatFood from "./EatFood";

const FoodSearch = () => {
    const [search, setSearch] = useState("");
    const [showEat, setShowEat] = useState(false);
    const [foodSelection, setFoodSelection] = useState({})

    const results = useQuery(["search", search], searchAllFoods, {
        enabled: !!search // Disable query until there is input
    });

    const handleFoodSelection = (food) => {
        setFoodSelection(food)
        setShowEat(true);
    }


    return (
        <div>
            {showEat && (
                <EatFood food={foodSelection} />
            )}
            {!showEat && (
                <div>
                    <h1>Food Search</h1>
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {results.data && (
                        <div>
                            <ul>
                                {results.data.map((food, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleFoodSelection(food)}>
                                        {food.name} ({food.amount}{food.unit})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

        </div>

    );
};

export default FoodSearch;