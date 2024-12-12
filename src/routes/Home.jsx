import { Link } from "react-router"
import FoodSearch from "../components/FoodSearch"
import { useState } from "react"

const Home = () => {
    const [showFood, setShowFood] = useState(false);

    const handleShowFood = () => {
        setShowFood(!showFood)
    }
    return (
        <div>
            <div></div>

            {!showFood &&
                <div>
                    <h1>Today</h1>
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