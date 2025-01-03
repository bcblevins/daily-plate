import { useEffect, useState } from "react";
import supabase from "./supabase";

export async function register({ email, password }) {
  const { user, session, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })
  if (error) {
    console.log(error)
    throw new Error('Supabase: Unable to register new account')
  }
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  if (error) {
    throw new Error('Supabase: Unable to sign in')
  }
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error('Supabase: Unable to sign out')
  }
}

export function useAuthStatus() {
  //TODO: fix session persistence on reload
  // Initialize by checking local storage for a session
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      console.log(session)
      setLoading(false)
    })


    // More confusing syntax! :D
    //
    // {data: subscription} = ...
    // - the "{data}" is normal destructuring, we want the "data" property of the object returned by "onAuthStateChange()" 
    // - the ": subscription" renames the "data" property to "subscription" 
    // - end result: we have a variable "subscription" that represents the "data" property returned by "onAuthStateChange()"
    //
    // (_event, session): 
    // - "onAuthStateChange()" requires 2 arguments: (event, session). 
    // - "event" represents what state change happened, like signed in or out. 
    // - "session" represents the current session
    // - using "_event" instead of "event" just communicates that we don't care about and won't use the "event" argument.
    const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // This is a "cleanup" function. This will run when the component associated with the useEffect is removed from the DOM.
    // Essentially we are unsubscribing from the listener since we don't need it anymore, to prevent performance issues
    return () => {
      if (subscription.unsubscribe) {
        subscription.unsubscribe();
      } else {
        console.log("no subscription.unsubscribe")
      }
    }
  }, []);
  return { session, loading };
}

