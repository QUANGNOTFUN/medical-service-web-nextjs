import { useQuery } from "@apollo/client";
import { GET_MEDICATIONS } from "@/app/(admin)/medication-manage/lib/graphql/medications";
import { Medication } from "@/types/medications";

export function useGetMedications() {
	const { data, loading, error, refetch } = useQuery<{ medications: Medication[] }>(GET_MEDICATIONS);
	return {
		medications: data?.medications || [],
		loading,
		error,
		refetch,
	};
}