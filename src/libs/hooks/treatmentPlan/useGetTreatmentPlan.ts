import { useQuery } from "@apollo/client";
import {GET_PATIENT_PLAN} from "@/libs/graphqls/treatmentPlan";
import {Patient} from "@/types/patient";

export function useGetTreatmentPlan(id: string) {
    const { data, loading, error, refetch } = useQuery<{ getPatientById: Patient }>(
        GET_PATIENT_PLAN,
        {
            variables: { id },
            skip: !id,
        }
    );

    return {
        patient: data?.getPatientById,
        plan: data?.getPatientById?.plan,
        loading,
        error,
        refetch,
    };
}
