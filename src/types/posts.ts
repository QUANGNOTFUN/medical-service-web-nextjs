export interface Post {
    id: number;
    title: string;
    content: string;
    author_id: string;
    category: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreatePostInput{
    title: string;
    content: string;
    category: string;

}
export interface UpdatePostInput{
    id?: number;
    title?: string;
    content?: string;
    category?: string;
}

export interface DeletePostInput{
    id: number;
}