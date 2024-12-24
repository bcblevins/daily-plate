import { Link } from "react-router"
import FoodSearch from "../components/FoodSearch"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../components/contexts";

const Home = () => {
    const [showFood, setShowFood] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs] = useState(0)
    const [fats, setFats] = useState(0)

    const handleShowFood = () => {
        setShowFood(!showFood)
    }

    useEffect(() => {

        let todayFoods = calcTodaysFoodList()

        // reduce array by each macro
        setProtein(
            roundToTenth(todayFoods.reduce(
                (protein, food) => protein + food.protein, 0
            ))
        )

        setCarbs(
            roundToTenth(todayFoods.reduce(
                (carbs, food) => carbs + food.carbs, 0
            ))
        )

        setFats(
            roundToTenth(todayFoods.reduce(
                (fats, food) => fats + (food.unsaturated_fat + food.saturated_fat), 0
            ))
        )

        function roundToTenth(num) {
            return Math.round(num * 10) / 10;
        }

        // - "user.eaten" is an array of objects {id, food_id, amount, created_at}
        // - we need an array of objects that includes nutritional info
        // - "calcTodaysFoodList" gets nutritional info from "user.foods" and adjusts them
        // by the "amount" in "user.eaten"
        function calcTodaysFoodList() {
            // output array
            let todayFoods = [];

            // create new "eaten" array from "user.eaten" that only has todays foods
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            let eaten = user.eaten.filter((food) => new Date(food.created_at) >= today)
            console.log(eaten)


            //  loop through new "eaten" array
            for (let f of eaten) {

                //  find matching user.foods based on eaten.id, 
                let currentFood = user.foods.find((food) => food.id == f.food_id);
                if (!currentFood) {
                    console.warn(`No user.food found for food id: ${f.food_id}. Skipping.`)
                    continue
                }

                //  create new object based on it and update properties based on serving 
                let servingCoeff = f.amount / currentFood.amount

                // create list of properties from object, apply logic to each, turn back into object
                let servingAdjustedFood = Object.fromEntries(
                    Object.entries(currentFood).map(([key, value]) => {
                        // want to multiply every value by the servingCoeff, but not "id" or non number properties
                        return [key, (typeof value === 'number' && key !== 'id') ? value * servingCoeff : value]
                    })
                )

                //  add to output array
                todayFoods.push(servingAdjustedFood)
            }

            console.log(todayFoods)
            return todayFoods
        }

    }, [user.eaten, user.foods])
    return (
        <div>
            <div></div>

            {!showFood &&
                <div>
                    <h1>Today</h1>
                    <h2>Macros</h2>
                    <h3>Protein: {protein}g</h3>
                    <h3>Carbs: {carbs}g</h3>
                    <h3>Fats: {fats}g</h3>
                    <button onClick={handleShowFood}>Log Food</button>
                    <ul>
                        {user.eaten.map((food, index) => (
                            <li
                                key={index}
                                onClick={() => handleFoodSelection(food)}>
                                {food.id}
                            </li>
                        ))}
                    </ul>
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