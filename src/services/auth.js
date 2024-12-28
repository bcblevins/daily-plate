import { useEffect, useState } from "react";
import supabase from "./supabase";

export async function register({ email, password }) {
  const { user, session, error } = await supabase.auth.signUp({
    email: email,
    password: password
  })
  if (error) {
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
  // Initialize by checking local storage for a session
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!supabase?.auth.getSession());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      // !!data?.session is a confusing expression.
      // - "!!" returns the boolean equivalent of something by forcing into boolean by using "!" (for example 
      //     null would become true because null is falsy) and the second "!" flips it back to its original state 
      //     (null would become false)
      // - "?" is a way to suppress errors. Usually, if you try to access a property on an object that doesn't exist,
      //     you get an error. The "?" returns undefined or null in the event that would normally report an error.
      // Broken down, the expression is:
      // - "data?.session": I want data.session, but if data doesn't exist return null instead of throwing error.
      // - "!!": I want the boolean equivalent of the above  
      setIsLoggedIn(!!data?.session);
      setLoading(false);
    }

    checkSession();

    // More confusing syntax! :D
    //
    // {data: subscription} = ...
    // - the "{data}" is normal destructuring, we want the "data" property of the object returned by "onAuthStateChange()" 
    // - the ": subscription" renames the "data" property to "subscription" 
    // - end result: we have a variable "subscription" that represents the "data" property returned by "onAuthStateChange()"
    //
    // (_, session): 
    // - "onAuthStateChange()" requires 2 arguments: (event, session). 
    // - "event" represents what state change happened, like signed in or out. 
    // - "session" represents the current session
    // - using "_" instead of "event" just communicates that we don't care about and won't use the "event" argument.
    const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
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
  return { isLoggedIn, loading };
}