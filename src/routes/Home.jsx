import { Link } from "react-router"
import FoodSearch from "../components/FoodSearch"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../components/contexts";

const Home = () => {
    const [showFood, setShowFood] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs] = useState(0)

    const handleShowFood = () => {
        setShowFood(!showFood)
    }

    useEffect(() => {
        
    })
    return (
        <div>
            <div></div>

            {!showFood &&
                <div>
                    <h1>Today</h1>
                    <h2>Macros</h2>
                    <h3>Protein: </h3>
                    <h3>Carbs: </h3>
                    <h3>Fats: </h3>
                    <p>{user.foods[0].name}</p>
                    <button onClick={handleShowFood}>Yay food!</button>
                </div>
            }
            {showFood &&
                <div>
                    <FoodSearch />
                    <button onClick={handleShowFood}>Back</button>
                </div>

            }


        </div>

    )
}

export default Home