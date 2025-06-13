import {useMutation} from "@apollo/client";
import {DELETE_APPOINTMENT} from "@/libs/graphqls/appointment";

export function useDeleteAppointment() {
    const [deleteAppointment, { data, loading, error }] = useMutation<{id: number}>(DELETE_APPOINTMENT, {});

    const remove = (id: string) => deleteAppointment({variables: {id}});

    return {
        delete: remove,
        data: data?.id ?? null,
        loading,
        error,
    }
}