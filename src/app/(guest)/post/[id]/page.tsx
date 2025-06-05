import {mockPosts} from "@/components/datasame/mau";

interface Props {
    params: { id: string };
}

export default function PostDetailPage({ params }: Props) {
    const postId = Number(params.id);
    const post = mockPosts.find(p => p.id === postId);

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
