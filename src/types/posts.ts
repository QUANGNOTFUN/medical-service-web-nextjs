export interface Post {
    id: number;
    title: string;
    content: string;
    author_id: string;
    category: string;
    created_at: Date;
    updated_at: Date;
}