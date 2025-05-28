import {useQuery} from "@apollo/client";
import {Medication} from "@/types/medications";
import {SEARCH_MEDICATIONS} from "@/app/(admin)/medication-manage/lib/graphql/medications";

export function useSearchMedications(keyword: string) {
	const {data, loading, error, refetch} = useQuery<{ searchMedications: Medication[] }>(SEARCH_MEDICATIONS, {
		variables: { input: { keyword: keyword || "" } },
	});

	return {
		medications: data?.searchMedications || [],
		loading,
		error,
		refetch,
	};
}