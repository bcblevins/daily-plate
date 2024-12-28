import FoodSearch from "../components/FoodSearch"
import { useEffect, useState, useCallback } from "react"
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [showFood, setShowFood] = useState(false);
    const [user] = useUserContext()
    const [eatenList, setEatenList] = useState([]);
    const [date, setDate] = useState(new Date())
    const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 })

    const navigate = useNavigate();

    const handleShowFood = () => {
        setShowFood(!showFood)
    }

    function roundToTenth(num) {
        return Math.round(num * 10) / 10;
    }

    // - "user.eaten" is an array of objects {id, food_id, amount, created_at}
    // - we need an array of objects that includes nutritional info
    // - "calcTodaysFoodList" gets nutritional info from "user.foods" and adjusts them
    // by the "amount" in "user.eaten"
    const calcEatenList = useCallback(
        (date) => {
            const foodList = [];
            const dayAfter = new Date(date);
            dayAfter.setDate(dayAfter.getDate() + 1);
            dayAfter.setHours(0, 0, 0, 0);
            date.setHours(0, 0, 0, 0);

            const eaten = user.eaten.filter((food) => {
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
        },
        [user.eaten, user.foods]
    );

    useEffect(() => {
        const { foodList, macros } = calcEatenList(date);
        setEatenList(foodList);
        setMacros(macros);
    }, [calcEatenList, date]);

    return (
        <div>
            <div>
                <h1>Today</h1>
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