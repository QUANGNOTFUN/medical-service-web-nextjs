"use client";

import { useState } from "react";
import { Loader, View, BadgePlus, Pencil, Trash2 } from "lucide-react";
import { useMutation } from "@apollo/client";
import { INIT_BLOG_TABLE } from "@/app/(doctor)/blog/m_resource/constants";
import { DELETE_POST, UPDATE_POST } from "@/libs/graphqls/post";
import { useCreatePost } from "@/libs/hooks/posts/useCreatePost";
import ActionIconMenu from "@/app/(doctor)/_components/setting/ActionIconMenu";
import ConfirmationDialog from "@/app/(admin)/_components/dialog/ConfirmationDialog";

// Dữ liệu mẫu
const mockPosts = [
    {
        id: "1",
        title: "Bài viết về chính trị",
        content: "Nội dung về chính trị hiện nay...",
        author_id: "AUTH001",
        category: "Chính trị",
        created_at: "2025-06-14T10:00:00Z",
    },
    {
        id: "2",
        title: "Khám phá khoa học mới",
        content: "Những phát hiện khoa học gần đây...",
        author_id: "AUTH002",
        category: "Khoa học",
        created_at: "2025-06-13T14:30:00Z",
    },
    {
        id: "3",
        title: "Tương lai giáo dục",
        content: "Xu hướng giáo dục trong tương lai...",
        author_id: "AUTH003",
        category: "Giáo dục",
        created_at: "2025-06-12T09:00:00Z",
    },
];

export default function BlogPage() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<"view" | "create" | "update" | "delete">("view");
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
    });

    // Mock dữ liệu bài viết
    const displayedPosts = mockPosts;
    const initLoading = false;
    const errorPosts = null;
    const refetchPosts = async () => console.log("Mock refetch");

    const { create: createPostInput, loading: createLoading, error: errorCreate } = useCreatePost();
    const [updatePost, { loading: updateLoading, error: errorUpdate }] = useMutation(UPDATE_POST);
    const [deletePost, { loading: deleteLoading, error: errorDelete }] = useMutation(DELETE_POST);

    const loading = initLoading || createLoading || updateLoading || deleteLoading;
    const error = errorPosts || errorCreate || errorUpdate || errorDelete;

    function handleAction(action: "view" | "create" | "update" | "delete", id?: string) {
        setSelectedAction(action);
        setSelectedId(id || null);
        if (action === "update" && id) {
            const selectedPost = displayedPosts.find(post => post.id === id);
            if (selectedPost) {
                setFormData({
                    title: selectedPost.title,
                    content: selectedPost.content,
                    category: selectedPost.category,
                });
            }
        }
    }

    function handleSelectedId(id: string | null) {
        if (id !== null) {
            setSelectedId(id);
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

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
                author_id: "q",
            });
            await refetchPosts();
            setFormData({ title: "", content: "", category: "" });
        } catch (error) {
            console.error("Create post error:", error);
        }
    }

    async function handleUpdateSubmit() {
        if (selectedId === null) return;
        try {
            await updatePost({
                variables: {
                    id: parseInt(selectedId),
                    input: {
                        title: formData.title,
                        content: formData.content,
                        category: formData.category,
                    },
                },
            });
            await refetchPosts();
            handleAction("view");
            setFormData({ title: "", content: "", category: "" });
        } catch (error) {
            console.error("Update post error:", error);
        }
    }

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
            action: "--",
        },
    ];

    const renderForm = () => {
        switch (selectedAction) {
            case "delete":
                if (selectedId === null) return null;
                return (
                    <ConfirmationDialog
                        isOpen={selectedAction === "delete"}
                        message={"Bạn có chắc chắn muốn xóa bài viết này không?"}
                        onClose={() => handleAction("view")}
                        onConfirm={handleDeleteSubmit}
                        title={"Xác nhận xóa bài viết"}
                        confirmText="Chắc chắn"
                        cancelText="Hủy"
                    />
                );
            case "update":
                if (selectedId === null) return null;
                return (
                    <ConfirmationDialog
                        isOpen={selectedAction === "update"}
                        message={
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-gray-700">Tiêu đề</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="p-2 border border-gray-300 rounded-lg w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Nội dung</label>
                                    <input
                                        type="text"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        className="p-2 border border-gray-300 rounded-lg w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Danh mục</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="p-2 border border-gray-300 rounded-lg w-full"
                                    >
                                        <option value="">-- Chọn loại --</option>
                                        <option value="Chính trị">Chính trị</option>
                                        <option value="Khoa học">Khoa học</option>
                                        <option value="Giáo dục">Giáo dục</option>
                                    </select>
                                </div>
                            </div>
                        }
                        onClose={() => handleAction("view")}
                        onConfirm={handleUpdateSubmit}
                        title={"Cập nhật bài viết"}
                        confirmText="Chắc chắn"
                        cancelText="Hủy"
                    />
                );
            default:
                return null;
        }
    };

    if (loading) return <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />;
    if (error)
        return (
            <div className="text-red-500 text-center mt-10">
                {error.name}: {error.message}
            </div>
        );

    return (
        <div className="min-h-screen flex flex-col gap-6 p-6 bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">📝 Tạo bài viết mới</h2>
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
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    {renderForm()}
                    <table className="w-full">
                        <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            {INIT_BLOG_TABLE.map((header, index) => (
                                <th key={index} className="p-4 text-left font-medium">
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {tableItems.map((item, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="border-t hover:bg-gray-50"
                                onClick={() => typeof item.id === "string" && handleSelectedId(item.id)}
                            >
                                {INIT_BLOG_TABLE.map((header, colIndex) => (
                                    <td key={colIndex} className="p-4 text-gray-600">
                                        {item[header.key] === "--" && colIndex === 0 ? (
                                            <span className="text-gray-400">{item[header.key]}</span>
                                        ) : header.key === "action" ? (
                                            item[header.key]
                                        ) : (
                                            <span>{item[header.key]}</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}