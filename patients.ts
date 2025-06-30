import { supabase } from "../supabase"
import type { Patient } from "../supabase"

export async function getPatients() {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select(`
        *,
        user:users(*)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return data as Patient[]
  } catch (error) {
    console.error("Get patients error:", error)
    throw error
  }
}

export async function getPatientByUserId(userId: string) {
  try {
    const { data, error } = await supabase
      .from("patients")
      .select(`
        *,
        user:users(*)
      `)
      .eq("user_id", userId)
      .single()

    if (error) {
      throw error
    }

    return data as Patient
  } catch (error) {
    console.error("Get patient by user ID error:", error)
    throw error
  }
}

export async function updatePatientProfile(patientId: string, updateData: Partial<Patient>) {
  try {
    const { data, error } = await supabase
      .from("patients")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", patientId)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Update patient profile error:", error)
    throw error
  }
}
