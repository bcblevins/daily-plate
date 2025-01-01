import FoodSearch from "./FoodSearch"
import { useEffect, useState, useCallback } from "react"
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { refreshUser } from "../services/userContextService";
import { getEaten } from "../services/userService";

const Home = () => {
    const [user, setUser] = useUserContext()
    const [eatenList, setEatenList] = useState([]);
    const [day, setDay] = useState(new Date())
    const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 })

    const navigate = useNavigate();

    function roundToTenth(num) {
        return Math.round(num * 10) / 10;
    }

    function handleChangeDay(change) {
        const newDate = new Date(day);
        newDate.setDate(newDate.getDate() + change)
        setDay(newDate)
    }

    function isDateToday(date) {
        const today = new Date()
        return today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    }




    useEffect(() => {
        getEaten(day).then((eatenList) => {
            const { foodList, macros } = calcEatenList(day, eatenList);
            setEatenList(foodList);
            setMacros(macros);
        })



        if (Date.now - user.retrieved > 30000) {
            refreshUser(setUser)
        }

        // "calcTodaysFoodList" gets nutritional info from "user.foods" and adjusts them
        // by the "amount" in "eatenList"
        function calcEatenList(date, eatenList) {
            const foodList = [];
            const dayAfter = new Date(date);
            dayAfter.setDate(dayAfter.getDate() + 1);
            dayAfter.setHours(0, 0, 0, 0);
            date.setHours(0, 0, 0, 0);

            const eaten = eatenList.filter((food) => {
                const created = new Date(food.created_at);
                return created >= date && created < dayAfter;
            });

            let protein = 0,
                carbs = 0,
                fats = 0;

            for (const f of eaten) {
                const currentFood = user.foods.find((food) => food.id === f.food_id);
                if (!currentFood) {
                    console.warn(`No user.food found for food id: ${f.food_id}. Skipping.`);
                    continue;
                }

                const servingCoeff = f.amount / currentFood.amount;

                const servingAdjustedFood = Object.fromEntries(
                    Object.entries(currentFood).map(([key, value]) => [
                        key,
                        typeof value === "number" && key !== "id" ? value * servingCoeff : value,
                    ])
                );

                foodList.push(servingAdjustedFood);

                protein += servingAdjustedFood.protein || 0;
                carbs += servingAdjustedFood.carbs || 0;
                fats +=
                    (servingAdjustedFood.unsaturated_fat || 0) +
                    (servingAdjustedFood.saturated_fat || 0);
            }

            return {
                foodList,
                macros: {
                    protein: roundToTenth(protein),
                    carbs: roundToTenth(carbs),
                    fats: roundToTenth(fats),
                },
            };
        }
    }, [day, user, setUser]);

    return (
        <div>
            <div>
                <button onClick={() => handleChangeDay(-1)} >{"<"}</button>
                <h1>{ isDateToday(day) ? "Today" : day.toDateString() }</h1>
                <button onClick={() => handleChangeDay(1)} >{">"}</button>
                <h2>Macros</h2>
                <h3>Protein: {macros.protein}g</h3>
                <h3>Carbs: {macros.carbs}g</h3>
                <h3>Fats: {macros.fats}g</h3>
                <button onClick={() => navigate("/search")}>Log Food</button>
                <ul>
                    {eatenList.map((food, index) => (
                        <li key={index}>
                            {food.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Home