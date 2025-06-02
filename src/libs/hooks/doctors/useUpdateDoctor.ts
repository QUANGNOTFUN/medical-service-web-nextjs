import {Reference, StoreObject, useMutation} from "@apollo/client";
import {UPDATE_MEDICATION} from "@/libs/graphqls/medications";
import {Medication, UpdateMedicationInput} from "@/types/medications";
import {UpdateDoctorInput} from "@/types/doctors";

export function useUpdateDoctor() {
	const [updateMedication, {data, loading, error}] = useMutation<
		{ medication: Medication },
		{ id: number; input: UpdateMedicationInput }
	>(UPDATE_MEDICATION, {
		// Tùy chọn: Cập nhật cache sau khi mutation
		update(cache, {data}) {
			if (data?.medication) {
				cache.modify({
					fields: {
						medications(existingMedications = [], {readField}) {
							return existingMedications.map((med: Reference | StoreObject | undefined) =>
								readField('id', med) === data.medication.id ? data.medication : med,
							);
						},
					},
				});
			}
		},
	});

	const update = (id: string, input: UpdateDoctorInput) =>
		updateMedication({variables: {id, input}});

	return {
		update,
		data: data?.medication ?? null,
		loading,
		error,
	}
}