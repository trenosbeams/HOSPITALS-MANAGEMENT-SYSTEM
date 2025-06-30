import { supabase } from "../supabase"
import type { MedicalRecord } from "../supabase"

export async function getMedicalRecords(patientId: string) {
  try {
    const { data, error } = await supabase
      .from("medical_records")
      .select(`
        *,
        doctor:doctors(
          *,
          user:users(*)
        )
      `)
      .eq("patient_id", patientId)
      .order("visit_date", { ascending: false })

    if (error) {
      throw error
    }

    return data as MedicalRecord[]
  } catch (error) {
    console.error("Get medical records error:", error)
    throw error
  }
}

export async function createMedicalRecord(recordData: {
  patientId: string
  doctorId: string
  appointmentId?: string
  diagnosis?: string
  symptoms?: string
  treatment?: string
  prescription?: string
  notes?: string
  visitDate: string
}) {
  try {
    const { data, error } = await supabase
      .from("medical_records")
      .insert({
        patient_id: recordData.patientId,
        doctor_id: recordData.doctorId,
        appointment_id: recordData.appointmentId,
        diagnosis: recordData.diagnosis,
        symptoms: recordData.symptoms,
        treatment: recordData.treatment,
        prescription: recordData.prescription,
        notes: recordData.notes,
        visit_date: recordData.visitDate,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Create medical record error:", error)
    throw error
  }
}
