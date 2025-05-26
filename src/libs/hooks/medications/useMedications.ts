import { useQuery } from "@apollo/client";
import { GET_MEDICATIONS } from "@/libs/graphqls/medications";
import { Medication } from "@/types/medications";

export function useMedications() {
	const { data, loading, error, refetch } = useQuery<{ medications: Medication[] }>(GET_MEDICATIONS);
	return {
		medications: data?.medications || [],
		loading,
		error,
		refetch,
	};
}