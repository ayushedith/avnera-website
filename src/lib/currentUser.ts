import { getCurrentUser } from './auth'

export async function serverCurrentUser() {
  // wrapper kept for future provider swaps
  return getCurrentUser()
}
