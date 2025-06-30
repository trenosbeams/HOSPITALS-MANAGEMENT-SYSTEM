-- Insert sample users
INSERT INTO users (id, email, password_hash, role, full_name, phone) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@hospital.com', '$2b$10$example_hash_admin', 'admin', 'Admin Hospital', '081234567890'),
('550e8400-e29b-41d4-a716-446655440002', 'doctor@hospital.com', '$2b$10$example_hash_doctor', 'doctor', 'Dr. Sarah Johnson', '081234567891'),
('550e8400-e29b-41d4-a716-446655440003', 'patient@hospital.com', '$2b$10$example_hash_patient', 'patient', 'John Doe', '081234567892'),
('550e8400-e29b-41d4-a716-446655440004', 'doctor2@hospital.com', '$2b$10$example_hash_doctor2', 'doctor', 'Dr. Michael Chen', '081234567893');

-- Insert sample patients
INSERT INTO patients (user_id, date_of_birth, gender, address, emergency_contact, emergency_phone, blood_type) VALUES
('550e8400-e29b-41d4-a716-446655440003', '1990-05-15', 'male', 'Jl. Sudirman No. 123, Jakarta', 'Jane Doe', '081234567899', 'O+');

-- Insert sample doctors
INSERT INTO doctors (user_id, specialty, license_number, experience_years, consultation_fee, is_available) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'Kardiologi', 'DOC001', 10, 500000.00, true),
('550e8400-e29b-41d4-a716-446655440004', 'Dermatologi', 'DOC002', 8, 400000.00, true);

-- Insert sample doctor schedules
INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time) VALUES
((SELECT id FROM doctors WHERE license_number = 'DOC001'), 1, '09:00', '17:00'), -- Monday
((SELECT id FROM doctors WHERE license_number = 'DOC001'), 2, '09:00', '17:00'), -- Tuesday
((SELECT id FROM doctors WHERE license_number = 'DOC001'), 3, '09:00', '17:00'), -- Wednesday
((SELECT id FROM doctors WHERE license_number = 'DOC002'), 1, '10:00', '16:00'), -- Monday
((SELECT id FROM doctors WHERE license_number = 'DOC002'), 3, '10:00', '16:00'), -- Wednesday
((SELECT id FROM doctors WHERE license_number = 'DOC002'), 5, '10:00', '16:00'); -- Friday

-- Insert sample appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES
((SELECT id FROM patients LIMIT 1), (SELECT id FROM doctors WHERE license_number = 'DOC001'), '2024-01-15', '10:00', 'confirmed'),
((SELECT id FROM patients LIMIT 1), (SELECT id FROM doctors WHERE license_number = 'DOC002'), '2024-01-20', '14:30', 'pending');
