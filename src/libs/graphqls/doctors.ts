import { gql } from "@apollo/client";
import {UpdateDoctorInput} from "@/types/doctors";

export const GET_DOCTORS = gql`
    query GetDoctors {
        doctors {
            id
            user {
              id
              email
              full_name
              phone
              address
              gender
              date_of_birth
            }
            qualifications
            work_seniority
            specialty
            hospital
        }
    }
`;

// Lấy 1 bác sĩ theo ID
export const GET_DOCTOR = gql`
    query GetDoctor($id: String!) {
        doctor(id: $id) {
            id
            qualifications
            work_seniority
            specialty
            hospital
            created_at
            updated_at
        }
    }
`;

// Tạo mới 1 bác sĩ
export const CREATE_DOCTOR = gql`
    mutation RegisterDoctor($input: RegisterDoctorInput!) {
        createDoctorAndUser(input: $input) {
            id
            user {
                id
                email
                full_name
                gender
                role
            }
            qualifications
            work_seniority
            specialty
            hospital
        }
    }
`;


// Cập nhật thông tin bác sĩ
export const UPDATE_DOCTOR = gql`
    mutation UpdateDoctor($id: String!, $doctorData: UpdateDoctorInput!) {
        updateDoctor(id: $id, doctorData: $doctorData) {
            id
            user {
                id
                email
                full_name
                gender
            }
            qualifications
            work_seniority
            specialty
            hospital
        }
    }
`;

// Xóa bác sĩ
export const DELETE_DOCTOR = gql`
    mutation DeleteDoctor($id: String!) {
        deleteDoctor(id: $id) {
            id
        }
    }
`;
