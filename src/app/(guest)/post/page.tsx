import PostCard from "@/components/cards/PostCard";
import { mockPosts } from "@/components/datasame/mau";

export default function Home() {
    return (
        <section className="pt-20 pb-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}
