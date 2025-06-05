import { Post } from "@/types/posts";

export const mockPosts: Post[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Bài viết mẫu số ${i + 1}`,
    content: `Đây là nội dung chi tiết của bài viết mẫu số ${i + 1}.`,
    author_id: "Ẩn danh",
    category: "Tuyên truyền",
    created_at: new Date(`2025-06-${(i % 30) + 1}T08:00:00Z`),
    updated_at: new Date(`2025-06-${(i % 30) + 1}T08:00:00Z`)
}));
