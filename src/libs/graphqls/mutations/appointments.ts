import { gql } from '@apollo/client';

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      doctor_id
      patient_id
      status
      appointment_type
      slot_id
      notes
    }
  }
`;
