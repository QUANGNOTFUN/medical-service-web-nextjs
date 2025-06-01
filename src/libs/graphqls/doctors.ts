import { gql } from "@apollo/client";

// Lấy danh sách tất cả bác sĩ
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
            user_id
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
    mutation CreateDoctor($doctorData: CreateDoctorDto!) {
        createDoctor(doctorData: $doctorData) {
            id
            user_id
            qualifications
            work_seniority
            specialty
            hospital
            created_at
            updated_at
        }
    }
`;

// Cập nhật thông tin bác sĩ
export const UPDATE_DOCTOR = gql`
    mutation UpdateDoctor($id: String!, $doctorData: CreateDoctorDto!) {
        updateDoctor(id: $id, doctorData: $doctorData) {
            id
            user_id
            qualifications
            work_seniority
            specialty
            hospital
            created_at
            updated_at
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
