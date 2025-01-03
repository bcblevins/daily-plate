import { getUser } from "./userService";

export async function refreshUser(setUser) {
    let userData = await getUser()

    console.log("refreshUser called", userData)
    setUser(userData)

}