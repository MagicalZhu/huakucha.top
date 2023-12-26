import type { SupabaseClient, User } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import { Ref } from 'vue'

export interface UseFirebaseAuthOptions {
  client: SupabaseClient
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export function useSupabase() {
  const client = createClient(supabaseUrl, supabaseAnonKey)

  async function LoginWithGithub() {
    const { error } = await client.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3333/',
      },
    })
    if (error)
      return false

    return true
  }
  async function logout() {
    const { error } = await client.auth.signOut()
    if (error)
      console.error(error)
  }

  async function getSession() {
    const {
      data: { session },
    } = await client.auth.getSession()
    return session
  }

  const user = ref<User | null>()

  client?.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      if (JSON.stringify(user.value) !== JSON.stringify(session.user))
        user.value = session.user
    }
    else {
      user.value = null
    }
  })

  return {
    client,
    LoginWithGithub,
    logout,
    getSession,
    user: user as Ref<User | null>,
  }
}
