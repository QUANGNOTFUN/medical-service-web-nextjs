import {useMutation} from "@apollo/client";
import {CREATE_POST} from "@/libs/graphqls/post";
import {CreatePostInput, Post} from "@/types/posts";


export function useCreatePost() {
    const [createPost, { data, loading, error }] = useMutation<
        {post: Post},
        {input : CreatePostInput}
    >(CREATE_POST)

    const create = (input: CreatePostInput) =>
        createPost({variables: {input}});

    return {
        create,
        data: data?.post ?? null,
        loading,
        error
    }
}