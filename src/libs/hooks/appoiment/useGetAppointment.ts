import {useQuery} from "@apollo/client";

import {GET_APPOINTMENT} from "@/libs/graphqls/appointment";
import {Appointment} from "@/types/appoitment";

export function useGetAppointments() {
    const { data, loading, error, refetch } = useQuery<{ input: Appointment[] }>(GET_APPOINTMENT);
    return {
        appointments: data?.input || [],
        loading,
        error,
        refetch,
    };
}