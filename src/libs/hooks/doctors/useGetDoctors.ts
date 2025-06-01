import {useQuery} from "@apollo/client";
import {Doctor} from "@/types/doctors";
import {GET_DOCTORS} from "@/libs/graphqls/doctors";

export function useGetDoctors() {
	const { data, loading, error, refetch } = useQuery<{ doctors: Doctor[] }>(GET_DOCTORS);
	return {
		doctors: data?.doctors || [],
		loading,
		error,
		refetch,
	};
}