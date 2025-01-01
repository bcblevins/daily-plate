import { useEffect, useState } from "react";
import { calcEatenList, calcNutrientList } from "../services/foodService";
import { getEaten } from "../services/userService";
import { useUserContext } from "../hooks/useUserContext";


function DailySummary() {
    const [user] = useUserContext()
    const [day, setDay] = useState(new Date())
    const [nutrients, setNutrients] = useState([])



    useEffect(() => {
        getEaten(day).then((eatenList) => {
            const { foodList } = calcEatenList(day, eatenList, user)
            setNutrients(calcNutrientList(foodList))
        })
    },[day, user])
    return (
        <div>
            <h1>Daily Summary</h1>
            <ul>
                {nutrients.map(([nutrient, amount]) => (
                    <li key={nutrient}>{nutrient}: {amount}</li>
                ))}
            </ul>
        </div>
    );
}

export default DailySummary;