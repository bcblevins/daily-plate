import supabase from "./supabase";

const foods = [
  {
    id: 1,
    name: "Apple, medium",
    calories: 95,
    unsaturated_fat: 0.2,
    saturated_fat: 0.0,
    protein: 0.5,
    carbs: 25,
    fiber: 4.4,
    sugar: 19,
    amount: 182,
    unit: "g"
  },
  {
    id: 2,
    name: "Chicken breast, cooked",
    calories: 165,
    unsaturated_fat: 3.0,
    saturated_fat: 1.0,
    protein: 31,
    carbs: 0,
    fiber: 0,
    sugar: 0,
    amount: 100,
    unit: "g"
  },
  {
    id: 3,
    name: "Broccoli, cooked",
    calories: 55,
    unsaturated_fat: 0.2,
    saturated_fat: 0.0,
    protein: 3.7,
    carbs: 11,
    fiber: 3.8,
    sugar: 2.4,
    amount: 100,
    unit: "g"
  },
  {
    id: 4,
    name: "White rice, cooked",
    calories: 130,
    unsaturated_fat: 0.1,
    saturated_fat: 0.0,
    protein: 2.4,
    carbs: 28,
    fiber: 0.4,
    sugar: 0.1,
    amount: 100,
    unit: "g"
  },
  {
    id: 5,
    name: "Almonds",
    calories: 164,
    unsaturated_fat: 13.0,
    saturated_fat: 1.0,
    protein: 6,
    carbs: 6,
    fiber: 3.5,
    sugar: 1,
    amount: 28,
    unit: "g"
  },
  {
    id: 6,
    name: "Salmon, cooked",
    calories: 206,
    unsaturated_fat: 3.8,
    saturated_fat: 1.3,
    protein: 22,
    carbs: 0,
    fiber: 0,
    sugar: 0,
    amount: 100,
    unit: "g"
  },
  {
    id: 7,
    name: "Egg, large",
    calories: 70,
    unsaturated_fat: 4.0,
    saturated_fat: 1.6,
    protein: 6,
    carbs: 0.6,
    fiber: 0,
    sugar: 0.6,
    amount: 50,
    unit: "g"
  },
  {
    id: 8,
    name: "Banana, medium",
    calories: 105,
    unsaturated_fat: 0.3,
    saturated_fat: 0.1,
    protein: 1.3,
    carbs: 27,
    fiber: 3.1,
    sugar: 14,
    amount: 118,
    unit: "g"
  },
  {
    id: 9,
    name: "Cheddar cheese",
    calories: 113,
    unsaturated_fat: 3.6,
    saturated_fat: 6.0,
    protein: 7,
    carbs: 0.4,
    fiber: 0,
    sugar: 0,
    amount: 28,
    unit: "g"
  },
  {
    id: 10,
    name: "Spinach, raw",
    calories: 23,
    unsaturated_fat: 0.1,
    saturated_fat: 0.0,
    protein: 2.9,
    carbs: 3.6,
    fiber: 2.2,
    sugar: 0.4,
    amount: 100,
    unit: "g"
  }
];


export async function searchDBFoods(search) {

  let results = []
  for (let food of foods) {
    if (food.name.toLocaleLowerCase().includes(search) || search.includes(food.name)) {
      food.isUserFood = false;
      results.push(food);
    }
  }

  return results
}

export async function getFoodById(id) {
  const result = foods.find((food) => food.id === id)

  if (result) {
    return result
  } else {
    throw new Error("Could not find db food")
  }
}

export async function searchAllFoods({ queryKey }) {
  let search = queryKey[1].toLocaleLowerCase()
  let userFoods = queryKey[2]
  let results = [];
  for (let food of userFoods) {
    if (food.name.toLocaleLowerCase().includes(search) || search.includes(food.name)) {
      food.isUserFood = true;
      results.push(food);
    }
  }
  let dbResults = await searchDBFoods(search)

  return [...results, ...dbResults]
}

// TODO: 
//   Situation: User selects food from global db foods and eats it. They come back
//   and select the same food again (not from user list). 
//   Solution: prevent user from adding a food to user_foods if an identical entry
//   exists. 
export async function eatFood(data) {

  let food = data.food
  let amount = data.amount

  let id = food.id;

  // add to user foods if not already
  if (!food.isUserFood) {

    // these properties don't exist in database, delete them to avoid errors
    delete food.isUserFood
    delete food.id

    const { data: userFoodData, error: userFoodError } = await supabase
      .from("user_foods")
      .insert(food)
      .select()

    if (userFoodError) {
      throw new Error(userFoodError.message)
    } else {
      id = userFoodData[0].id
      food = userFoodData[0];
    }
  }

  const foodLogEntry = {
    food_id: id,
    amount: amount
  }

  const { data: logData, error: logError } = await supabase
    .from("user_log")
    .insert(foodLogEntry)
    .select()

  if (logError) {
    throw new Error(logError.message)
  }

  return logData;
}

export async function addUserFood(food) {
  const [data, error] = supabase
    .from("user_foods")
    .insert(food)
    .select()
  if (error) {
    throw new Error("Cannot add user food")
  }
  return data;
}

