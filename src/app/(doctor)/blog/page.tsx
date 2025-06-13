"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import DoctorTableLayout from "@/app/(doctor)/_components/Layout/DoctorTableLayout";
import { View, BadgePlus, Pencil, Trash2 } from "lucide-react";
import { useQuery, useMutation } from "@apollo/client";
import { INIT_BLOG_TABLE } from "@/app/(doctor)/blog/m_resource/constants";
import { DELETE_POST, GET_POSTS, UPDATE_POST } from "@/libs/graphqls/post";
import { useCreatePost } from "@/libs/hooks/posts/useCreatePost";

export default function BlogPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<"view" | "create" | "update" | "delete">("view");
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
    });

    // Lấy danh sách bài viết
    const { data, loading: initLoading, error: errorPosts, refetch: refetchPosts } = useQuery(GET_POSTS, {
        variables: { input: { page: 1, pageSize: 10 } },
    });

    const { create: createPostInput, loading: createLoading, error: errorCreate } = useCreatePost();

    // Mutation để cập nhật bài viết
    const [updatePost, { loading: updateLoading, error: errorUpdate }] = useMutation(UPDATE_POST);

    // Mutation để xóa bài viết
    const [deletePost, { loading: deleteLoading, error: errorDelete }] = useMutation(DELETE_POST);

    // Sử dụng trực tiếp posts từ API
    const displayedPosts = data?.posts?.items || [];

    const loading = initLoading || createLoading || updateLoading || deleteLoading;
    const error = errorPosts || errorCreate || errorUpdate || errorDelete;

    // Xử lý hành động
    function handleAction(action: "view" | "create" | "update" | "delete", id?: string) {
        setSelectedAction(action);
        setSelectedId(id || null);
    }

    // Xử lý chọn ID
    function handleSelectedId(id: string | null) {
        if (id !== null) {
            setSelectedId(id);
        }
    }

    // Xử lý thay đổi input
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Xử lý tạo bài viết
    async function handleCreateSubmit() {
        if (!formData.title || !formData.content || !formData.category) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        try {
            await createPostInput({
                title: formData.title,
                content: formData.content,
                category: formData.category,
            });
            await refetchPosts();
            setFormData({ title: "", content: "", category: "" }); // Reset form
        } catch (error) {
            console.error("Create post error:", error);
        }
    }

    // Xử lý xóa bài viết
    async function handleDeleteSubmit() {
        if (selectedId === null) return;
        try {
            await deletePost({ variables: { id: parseInt(selectedId) } });
            await refetchPosts();
            handleAction("view");
        } catch (error) {
            console.error("Delete post error:", error);
        }
    }

    // Render cột hành động
    const renderActions = (post: any) => (
        <div className="flex space-x-2">
            <button
                className="p-1 text-blue-500 hover:text-blue-700"
                onClick={() => handleAction("view", post.id)}
                title="Xem"
            >
                <View className="w-5 h-5" />
            </button>
            <button
                className="p-1 text-green-500 hover:text-green-700"
                onClick={() => handleAction("create")}
                title="Thêm"
            >
                <BadgePlus className="w-5 h-5" />
            </button>
            <button
                className="p-1 text-yellow-500 hover:text-yellow-700"
                onClick={() => handleAction("update", post.id)}
                title="Sửa"
            >
                <Pencil className="w-5 h-5" />
            </button>
            <button
                className="p-1 text-red-500 hover:text-red-700"
                onClick={() => handleAction("delete", post.id)}
                title="Xóa"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );

    // Chuẩn bị dữ liệu cho bảng
    const tableItems = [
        ...displayedPosts.map((post: any) => ({
            id: post.id,
            title: post.title || "N/A",
            content: post.content || "N/A",
            author_id: post.author_id || "N/A",
            category: post.category || "N/A",
            created_at: post.created_at ? new Date(post.created_at).toLocaleString() : "N/A",
            action: renderActions(post),
        })),
        {
            id: "--",
            title: "--",
            content: "--",
            author_id: "--",
            category: "--",
            created_at: "--",
            action: "--"
        }
    ];

    if (loading) return <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />;
    // if (error)
    //     return (
    //         <div className="text-red-500 text-center mt-10">
    //             {error.name}: {error.message}
    //         </div>
    //     );

    return (
        <div className="min-h-screen flex flex-col gap-6 p-6 bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    📝 Tạo bài viết mới
                </h2>

                <div className="grid grid-cols-3 gap-3 bg-gray-100 p-3 rounded-lg font-medium text-gray-700">
                    <p>Tiêu đề</p>
                    <p>Mô tả</p>
                    <p>Thuộc loại</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3 items-center">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Nhập tiêu đề"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        placeholder="Nhập mô tả"
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">-- Chọn loại --</option>
                        <option value="Chính trị">Chính trị</option>
                        <option value="Khoa học">Khoa học</option>
                        <option value="Giáo dục">Giáo dục</option>
                    </select>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleCreateSubmit}
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200"
                        disabled={createLoading}
                    >
                        {createLoading ? "Đang tạo..." : "Tạo bài viết"}
                    </button>
                </div>
            </div>

            {/* Danh sách bài viết */}
            <div className="container mx-auto p-6">
                <DoctorTableLayout
                    tableProps={{
                        headers: INIT_BLOG_TABLE,
                        items: tableItems,
                        action: { type: selectedAction, onClick: (item) => handleSelectedId(item as string) },
                    }}
                    paginationProps={undefined}
                />
            </div>
        </div>
    );
}