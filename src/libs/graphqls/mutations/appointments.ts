import { gql } from '@apollo/client';

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      id
      patient_id
      doctor_id
      schedule_id
      appointment_type
      appointment_date
      status
      is_anonymous
      notes
    }
  }
`;