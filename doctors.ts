import { supabase } from "../supabase"
import type { Doctor } from "../supabase"

export async function getDoctors() {
  try {
    const { data, error } = await supabase
      .from("doctors")
      .select(`
        *,
        user:users(*)
      `)
      .eq("is_available", true)
      .order("created_at", { ascending: true })

    if (error) {
      throw error
    }

    return data as Doctor[]
  } catch (error) {
    console.error("Get doctors error:", error)
    throw error
  }
}

export async function getDoctorSchedule(doctorId: string) {
  try {
    const { data, error } = await supabase
      .from("doctor_schedules")
      .select("*")
      .eq("doctor_id", doctorId)
      .eq("is_available", true)
      .order("day_of_week", { ascending: true })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Get doctor schedule error:", error)
    throw error
  }
}

export async function getDoctorByUserId(userId: string) {
  try {
    const { data, error } = await supabase
      .from("doctors")
      .select(`
        *,
        user:users(*)
      `)
      .eq("user_id", userId)
      .single()

    if (error) {
      throw error
    }

    return data as Doctor
  } catch (error) {
    console.error("Get doctor by user ID error:", error)
    throw error
  }
}
