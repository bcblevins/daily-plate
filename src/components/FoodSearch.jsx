import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchFood from "../services/fetchFood";

const FoodSearch = () => {
    const [search, setSearch] = useState("");
    const results = useQuery(["search", search], fetchFood, {
        enabled:!!search // Disable query until there is input
    });


    return (
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
                        {results.data.map((item, index) => (
                            <li key={index}>
                                {item.name} ({item.amount}{item.unit})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    );
};

export default FoodSearch;