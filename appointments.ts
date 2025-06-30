import { supabase } from "../supabase"
import type { Appointment } from "../supabase"

export async function getAppointments(userId: string, role: string) {
  try {
    let query = supabase.from("appointments").select(`
        *,
        patient:patients(
          *,
          user:users(*)
        ),
        doctor:doctors(
          *,
          user:users(*)
        )
      `)

    // Filter based on user role
    if (role === "patient") {
      const { data: patient } = await supabase.from("patients").select("id").eq("user_id", userId).single()

      if (patient) {
        query = query.eq("patient_id", patient.id)
      }
    } else if (role === "doctor") {
      const { data: doctor } = await supabase.from("doctors").select("id").eq("user_id", userId).single()

      if (doctor) {
        query = query.eq("doctor_id", doctor.id)
      }
    }

    const { data, error } = await query.order("appointment_date", { ascending: true })

    if (error) {
      throw error
    }

    return data as Appointment[]
  } catch (error) {
    console.error("Get appointments error:", error)
    throw error
  }
}

export async function createAppointment(appointmentData: {
  patientId: string
  doctorId: string
  appointmentDate: string
  appointmentTime: string
  notes?: string
}) {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        patient_id: appointmentData.patientId,
        doctor_id: appointmentData.doctorId,
        appointment_date: appointmentData.appointmentDate,
        appointment_time: appointmentData.appointmentTime,
        notes: appointmentData.notes,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Create appointment error:", error)
    throw error
  }
}

export async function updateAppointmentStatus(appointmentId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", appointmentId)
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Update appointment status error:", error)
    throw error
  }
}
