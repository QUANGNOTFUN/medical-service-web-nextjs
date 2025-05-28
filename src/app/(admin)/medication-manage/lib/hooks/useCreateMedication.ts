import {useMutation} from "@apollo/client";
import {CREATE_MEDICATION} from "@/app/(admin)/medication-manage/lib/graphql/medications";
import {CreateMedicationInput, Medication} from "@/types/medications";

export function useCreateMedication() {
	const [createMedication, { data, loading, error }] = useMutation<
		{ medication: Medication },
		{ input: CreateMedicationInput }
	>(CREATE_MEDICATION);

	return {
		create: createMedication,
		data: data?.medication ?? null,
		loading,
		error
	}
}