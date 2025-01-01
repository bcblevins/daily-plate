import { useEffect, useState } from "react"
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { refreshUser } from "../services/userContextService";
import { getEaten } from "../services/userService";
import { calcEatenList } from "../services/foodService"

const Home = () => {
    const [user, setUser] = useUserContext()
    const [eatenList, setEatenList] = useState([]);
    const [day, setDay] = useState(new Date())
    const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 })

    const navigate = useNavigate();



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
            const { foodList, macros } = calcEatenList(day, eatenList, user);
            setEatenList(foodList);
            setMacros(macros);
        })

        if (Date.now - user.retrieved > 30000) {
            refreshUser(setUser)
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
                <button onClick={() => navigate("/summary")}>Summary</button>
            </div>
        </div>
    )
}

export default Home