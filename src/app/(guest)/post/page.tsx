"use client"

import PostCard from "@/components/cards/PostCard";
import {useGetAllPost} from "@/libs/hooks/posts/useGetPost";
import {useState} from "react";

export default function Home() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const {
        posts,
        total,
        loading: getLoading,
        error: getError,
        refetch: refetchPosts,
    } = useGetAllPost({ page, pageSize });
    return (
        <section className="pt-20 pb-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}
