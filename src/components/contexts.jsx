import { createContext } from "react"

// - The below demonstrates what an empty hook is/returns. 
// - Its always an array with 2 elements: 
//   - the thing we want to track with hooks (an object in this case)
//   - a function used to set the value of the state. 
// - We are going to pass this into our createContext()
//
// [ {}, function (){} ] 

export const UserContext = createContext([ {}, function (){} ])