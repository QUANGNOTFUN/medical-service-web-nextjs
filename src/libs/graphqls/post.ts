import { gql } from "@apollo/client";

export const GET_POSTS = gql`
    query GetPosts($input: PaginationInput!) {
        posts(input: $input) {
            items {
                id
                title
                content
                author_id
                category
                created_at
                updated_at
            }
            total
            page
            pageSize
            totalPages
        }
    }
`;

export const SEARCH_POSTS = gql`
    query SearchPosts($input: SearchPostsInput!) {
        searchPosts(input: $input) {
            id
            title
            content
            author_id
            category
            created_at
            updated_at
        }
    }
`;

export const GET_POST = gql`
    query GetPost($id: Int!) {
        post(id: $id) {
            id
            title
            content
            author_id
            category
            created_at
            updated_at
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
            id
            title
            content
            author_id
            category
            created_at
            updated_at
        }
    }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($id: Int!, $input: UpdatePostInput!) {
        updatePost(id: $id, input: $input) {
            id
            title
            content
            author_id
            category
            created_at
            updated_at
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: Int!) {
        deletePost(id: $id) {
            id
            title
            content
            author_id
            category
            created_at
            updated_at
        }
    }
`;