import {useMutation} from "@apollo/client";
import {DELETE_MEDICATION} from "@/app/(admin)/medication-manage/lib/graphql/medications";

export function useDeleteMedication() {
	const [deleteMedication, { data, loading, error }] = useMutation<{id: number}>(DELETE_MEDICATION);

	const remove = (id: number) => deleteMedication({variables: {id}});

	return {
		delete: remove,
		data: data?.id ?? null,
		loading,
		error,
	}
}