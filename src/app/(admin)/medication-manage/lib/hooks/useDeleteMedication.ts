import {useMutation} from "@apollo/client";
import {DELETE_MEDICATION} from "@/app/(admin)/medication-manage/lib/graphql/medications";

export function useDeleteMedication() {
	const [deleteMedication, { data, loading, error }] = useMutation<{id: number}>(DELETE_MEDICATION);
	return {
		delete: deleteMedication,
		data: data?.id ?? null,
		loading,
		error,
	}
}