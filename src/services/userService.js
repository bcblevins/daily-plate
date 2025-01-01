import supabase from './supabase'

export async function getUser() {

    let user = {};
    user.retrieved = Date.now();
    const [foods, prefs, eaten] = await Promise.all([
        getUserFoods(),
        getPrefs(),
    ])

    user.foods = foods;
    user.prefs = prefs;

    return user;
}

export async function getUserFoods() {
    const { data, error } = await supabase
        .from("user_foods")
        .select()

    if (error) {
        throw new Error("Cannot fetch user foods.", error.message)
    } else {
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

export async function getEaten(date) {
    date.setHours(0, 0, 0, 0);
    const dayAfter = new Date(date);
    dayAfter.setDate(dayAfter.getDate() + 1)
    const { data, error } = await supabase
        .from("user_log")
        .select()
        .gte("created_at", date.toISOString())
        .lte("created_at", dayAfter.toISOString())

    if (error) {
        throw new Error("Cannot fetch eaten foods", error)
    } else {
        return data
    }
}

