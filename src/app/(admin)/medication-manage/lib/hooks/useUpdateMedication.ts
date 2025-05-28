import {useMutation} from "@apollo/client";
import {UPDATE_MEDICATION} from "@/app/(admin)/medication-manage/lib/graphql/medications";
import {Medication, UpdateMedicationInput} from "@/types/medications";

export function useUpdateMedication() {
	const [updateMedication, { data, loading, error }] = useMutation<
		{ medication:Medication },
		{ input: UpdateMedicationInput }
	>(UPDATE_MEDICATION);
	return {
		update: updateMedication,
		data: data?.medication ?? null,
		loading,
		error,
	}
}