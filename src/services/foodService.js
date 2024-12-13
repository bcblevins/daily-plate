// const fetchFood = async ({ queryKey }) => {
//     const search = queryKey[1];

//     const apiRes = await fetch(`https://dietagram.p.rapidapi.com/apiFood.php?name=Jab%C5%82ko&lang=pl?name=${search}`, {
//         headers: {
//             'User-Agent': 'DailyPlate - Android - Version 1.0'
//         },
//     })

//     if (!apiRes.ok) {
//         throw new Error("Food fetch not ok")
//     }

//     return apiRes.json();
// }

  
export async function fetchFood({queryKey}) {
    const foods = 
[
    {
      "name": "Apple, medium",
      "calories": 95,
      "unsaturated_fat": 0.2,
      "saturated_fat": 0.0,
      "protein": 0.5,
      "carbs": 25,
      "fiber": 4.4,
      "sugar": 19,
      "amount": 182,
      "unit": "g"
    },
    {
      "name": "Chicken breast, cooked",
      "calories": 165,
      "unsaturated_fat": 3.0,
      "saturated_fat": 1.0,
      "protein": 31,
      "carbs": 0,
      "fiber": 0,
      "sugar": 0,
      "amount": 100,
      "unit": "g"
    },
    {
      "name": "Broccoli, cooked",
      "calories": 55,
      "unsaturated_fat": 0.2,
      "saturated_fat": 0.0,
      "protein": 3.7,
      "carbs": 11,
      "fiber": 3.8,
      "sugar": 2.4,
      "amount": 100,
      "unit": "g"
    },
    {
      "name": "White rice, cooked",
      "calories": 130,
      "unsaturated_fat": 0.1,
      "saturated_fat": 0.0,
      "protein": 2.4,
      "carbs": 28,
      "fiber": 0.4,
      "sugar": 0.1,
      "amount": 100,
      "unit": "g"
    },
    {
      "name": "Almonds",
      "calories": 164,
      "unsaturated_fat": 13.0,
      "saturated_fat": 1.0,
      "protein": 6,
      "carbs": 6,
      "fiber": 3.5,
      "sugar": 1,
      "amount": 28,
      "unit": "g"
    },
    {
      "name": "Salmon, cooked",
      "calories": 206,
      "unsaturated_fat": 3.8,
      "saturated_fat": 1.3,
      "protein": 22,
      "carbs": 0,
      "fiber": 0,
      "sugar": 0,
      "amount": 100,
      "unit": "g"
    },
    {
      "name": "Egg, large",
      "calories": 70,
      "unsaturated_fat": 4.0,
      "saturated_fat": 1.6,
      "protein": 6,
      "carbs": 0.6,
      "fiber": 0,
      "sugar": 0.6,
      "amount": 50,
      "unit": "g"
    },
    {
      "name": "Banana, medium",
      "calories": 105,
      "unsaturated_fat": 0.3,
      "saturated_fat": 0.1,
      "protein": 1.3,
      "carbs": 27,
      "fiber": 3.1,
      "sugar": 14,
      "amount": 118,
      "unit": "g"
    },
    {
      "name": "Cheddar cheese",
      "calories": 113,
      "unsaturated_fat": 3.6,
      "saturated_fat": 6.0,
      "protein": 7,
      "carbs": 0.4,
      "fiber": 0,
      "sugar": 0,
      "amount": 28,
      "unit": "g"
    },
    {
      "name": "Spinach, raw",
      "calories": 23,
      "unsaturated_fat": 0.1,
      "saturated_fat": 0.0,
      "protein": 2.9,
      "carbs": 3.6,
      "fiber": 2.2,
      "sugar": 0.4,
      "amount": 100,
      "unit": "g"
    }
  ]
    const search = queryKey[1].toLocaleLowerCase();
    let results = []
    for (let food of foods) {
        if (food.name.toLocaleLowerCase().includes(search) || search.includes(food.name)) {
            results.push(food);
        }
    }

    return results
}

export async function eatFood({queryKey}) {
  
}