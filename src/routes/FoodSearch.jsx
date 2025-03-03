import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchAllFoods } from "../services/foodService";
import { UserContext } from "../components/contexts";
import { useNavigate } from "react-router-dom";

const FoodSearch = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const user = useContext(UserContext)

    const results = useQuery(["search", search, user[0].foods], searchAllFoods, {
        enabled: !!search // Disable query until there is input
    });

    const handleFoodSelection = (food) => {
        navigate("/eat", { state: food })
    }


    return (
        <div>
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
                                    onClick={() => handleFoodSelection(food)}
                                >
                                    {food.name} ({food.amount}{food.unit}) {food.isUserFood ? "[User]" : ""}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <button onClick={() => { navigate("/") }} >Back</button>
            </div>
        </div>
    );
};

export default FoodSearch;