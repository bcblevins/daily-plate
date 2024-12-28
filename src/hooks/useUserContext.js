import { useContext } from "react";
import { UserContext } from "../components/contexts";

export function useUserContext() {
    return useContext(UserContext);
}