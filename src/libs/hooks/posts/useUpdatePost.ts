import {useMutation} from "@apollo/client";
import {UPDATE_POST} from "@/libs/graphqls/post";
import {Post, UpdatePostInput} from "@/types/posts";

export function useUpdatePost() {
    const [updatePost, { data, loading, error }] = useMutation<
        {Post: Post},
        {input : UpdatePostInput}
    >(UPDATE_POST)

    const update = (input: { id: number; data: UpdatePostInput }) =>
        updatePost({variables: {input}});

    return {
        update,
        data: data?.Post ?? null,
        loading,
        error
    }
}