import supabase from './supabase'

export async function getUser() {

    let user = {};

    const [foods, prefs, eaten] = await Promise.all([
        getUserFoods(),
        getPrefs(),
        getEaten()
    ])

    console.log("foods: ", foods)
    console.log("prefs: ", prefs)
    console.log("eaten: ", eaten)
    

    user.foods = foods;
    user.prefs = prefs;
    user.eaten = eaten;

    return user;
}

export async function getUserFoods() {
    const { data, error } = await supabase
    .from("user_foods")
    .select()

    if (error) {
        throw new Error("Cannot fetch user foods.", error.message)
    } else {
        console.log(data)
        return data
    }
}

export async function getPrefs() {
    const { data, error } = await supabase
    .from("user_prefs")
    .select()

    if (error) {
        throw new Error("Cannot fetch user prefs", error.message)
    } else {
        return data
    }
}

export async function getEaten() {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5) 
    fiveDaysAgo.setHours(0,0,0,0)
    const { data, error } = await supabase
    .from("user_ate")
    .select()
    .gte("created_at", fiveDaysAgo.toISOString())

    if (error) {
        throw new Error("Cannot fetch eaten foods", error)
    } else {
        console.log(data)
        return data
    }
}