-- RLS Policies for users table
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for patients table
CREATE POLICY "Patients can view own data" ON patients
  FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('doctor', 'admin'))
  );

CREATE POLICY "Patients can update own data" ON patients
  FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for doctors table
CREATE POLICY "Doctors can view own data" ON doctors
  FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Public can view doctor info" ON doctors
  FOR SELECT USING (is_available = true);

-- RLS Policies for appointments table
CREATE POLICY "Users can view own appointments" ON appointments
  FOR SELECT USING (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid()) OR
    doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Patients can create appointments" ON appointments
  FOR INSERT WITH CHECK (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid())
  );

-- RLS Policies for medical_records table
CREATE POLICY "Medical records access" ON medical_records
  FOR SELECT USING (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid()) OR
    doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Doctors can create medical records" ON medical_records
  FOR INSERT WITH CHECK (
    doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid())
  );

-- RLS Policies for payments table
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (
    patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin'))
  );
