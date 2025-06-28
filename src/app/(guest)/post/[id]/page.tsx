"use client"
import {useGetAllPost} from "@/libs/hooks/posts/useGetPost";
import {useState} from "react";

interface Props {
    params: { id: string };
}

export default function PostDetailPage({ params }: Props) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const {
        posts,
        total,
        loading: getLoading,
        error: getError,
        refetch: refetchPosts,
    } = useGetAllPost({ page, pageSize });
    const postId = Number(params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return <p>Bài viết không tồn tại</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-6">{new Date(post.created_at).toLocaleDateString()}</p>
            <p>{post.content}</p>
        </div>
    );
}
