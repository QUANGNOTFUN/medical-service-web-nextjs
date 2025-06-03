import {useQuery} from "@apollo/client";
import {User} from "@/types/user";
import {GET_USER} from "@/libs/graphqls/queries/getUser";


export function useGetUsers() {
    const { data, loading, error, refetch } = useQuery<{ users: User[] }>(GET_USER);
    return {
        users: data?.users || [],
        loading,
        error,
        refetch,
    };
}