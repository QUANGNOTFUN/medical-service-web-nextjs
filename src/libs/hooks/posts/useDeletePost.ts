import {useMutation} from "@apollo/client";
import {DELETE_POST} from "@/libs/graphqls/post";

export function useDeletePost() {
    const [deletePost, { data, loading, error }] = useMutation<{id: number}>(DELETE_POST, {});

    const remove = (id: number) => deletePost({variables: {id}});

    return {
        delete: remove,
        data: data?.id ?? null,
        loading,
        error,
    }
}