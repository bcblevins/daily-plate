import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchAllFoods } from "../services/foodService";
import { UserContext } from "../components/contexts";

const FoodSearch = ({ onFoodSelect }) => {
    const [search, setSearch] = useState("");
    const user = useContext(UserContext)

    const results = useQuery(["search", search, user[0].foods], searchAllFoods, {
        enabled: !!search // Disable query until there is input
    });

    return (
        <div>
            <div>
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
                                    onClick={() => onFoodSelect(food)}
                                >
                                    {food.name} ({food.amount}{food.unit}) {food.isUserFood ? "[User]" : ""}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodSearch;