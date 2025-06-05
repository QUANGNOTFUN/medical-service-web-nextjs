"use client";

import { Post } from "@/types/posts";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface Props {
    post: Post;
}

const PostCard: FC<Props> = ({ post }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/post/${post.id}`)}
            className="cursor-pointer bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
            <h2 className="text-xl font-semibold text-blue-600 mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-2">
                📅 {post.created_at ? new Date(post.created_at).toLocaleDateString() : "Không rõ ngày"}
            </p>
            <p className="text-gray-700 mb-4">{post.content.slice(0, 100)}...</p>
            <div className="flex justify-between text-sm text-gray-500">
                <span>👤 {post.author_id}</span>
                <span>🏷️ {post.category}</span>
            </div>
        </div>
    );
};
export default PostCard;
