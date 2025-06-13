export interface Post {
    id: number;
    title: string;
    content: string;
    author_id: string;
    category: string;
    created_at: Date;
    updated_at: Date;
}

export interface createPost{
    title: string;
    content: string;
    category: string;

}
export interface updatePost{
    id: number;
    title: string;
    content: string;
    category: string;
}

export interface deletePost{
    id: number;
}