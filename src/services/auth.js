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

export async function login({email, password}) {
  console.log(supabase)
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  })

  if (error) {
    throw new Error('Supabase: Unable to sign in')
  }
  console.log(data)
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error('Supabase: Unable to sign out')
  }
}
