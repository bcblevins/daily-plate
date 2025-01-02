import { useEffect, useState } from "react"
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { refreshUser } from "../services/userContextService";
import { getEaten } from "../services/userService";
import { calcEatenList } from "../services/foodService"
import styles from '../assets/scss/modules/Home.module.scss'

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

    function macroProgress(amount, goal) {
        console.log(`${amount} / ${goal}`)
        let percent = (amount / goal) * 100
        console.log(percent)
        return Math.round(percent);
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
        <div className={styles.home}>

            <header>
                <button onClick={() => handleChangeDay(-1)} className={styles.leftDateButton} >{ }</button>
                <h1>{isDateToday(day) ? "Today" : day.toDateString()}</h1>
                <button onClick={() => handleChangeDay(1)} className={styles.rightDateButton} >{ }</button>
            </header>

            <div className={styles.macros} >
                <div>
                    <h2>Protein <span>{macroProgress(macros.protein, user.goals.protein)}%</span></h2>
                    <div className={styles.progressBar} >
                        <div style={{ width: `${macroProgress(macros.protein, user.goals.protein)}%` }}></div>
                    </div>
                    <div className={styles.progressNumbers} >
                        <p>{macros.protein}g</p>
                        <p>{user.goals.protein}g</p>
                    </div>
                </div>

                <div>
                    <h2>Carbs <span>{macroProgress(macros.carbs, user.goals.carbs)}%</span></h2>
                    <div className={styles.progressBar} >
                        <div style={{ width: `${macroProgress(macros.carbs, user.goals.carbs)}%` }}></div>
                    </div>
                    <div className={styles.progressNumbers} >
                        <p>{macros.carbs}g</p>
                        <p>{user.goals.carbs}g</p>
                    </div>
                </div>
                <div>
                    <h2>Fats <span>{macroProgress(macros.fats, user.goals.fat)}%</span></h2>
                    <div className={styles.progressBar} >
                        <div style={{ width: `${macroProgress(macros.fats, user.goals.fat)}%` }}></div>
                    </div>
                    <div className={styles.progressNumbers} >
                        <p>{macros.fats}g</p>
                        <p>{user.goals.fat}g</p>
                    </div>
                </div>

            </div>
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
    )
}

export default Home