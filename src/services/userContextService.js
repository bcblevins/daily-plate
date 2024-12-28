import { getUser } from "./userService";

export async function refreshUser(setUser) {
    let userData = await getUser()

    setUser(userData)

}