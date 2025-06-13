import {Appointment, UpdateAppointmentInput} from "@/types/appoitment";
import {useMutation} from "@apollo/client";
import {UPDATE_APPOINTMENT} from "@/libs/graphqls/appointment";

export function useUpdateAppointment() {
    const [updateAppointment, { data, loading, error }] = useMutation<
        {appointment: Appointment},
        {input : UpdateAppointmentInput}
    >(UPDATE_APPOINTMENT)

    const update = (input: { id: string; data: UpdateAppointmentInput }) =>
        updateAppointment({variables: {input}});

    return {
        update,
        data: data?.appointment ?? null,
        loading,
        error
    }
}