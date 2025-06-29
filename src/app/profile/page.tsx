"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { GET_PATIENT_BY_ID, UPDATE_PATIENT_BY_ID } from "@/libs/graphqls/queries/profile";
import Profile from "@/app/profile/info/info";

export default function ProfilePage() {
    const { data: session } = useSession();

    const { data, loading, error } = useQuery(GET_PATIENT_BY_ID, {
        variables: { input: { patient_id: session?.user?.id } },
        skip: !session?.user?.id,
    });

    const patient = data?.findOnePatient;
    const user = patient?.user;

    const [form, setForm] = useState({
        full_name: "",
        date_of_birth: "",
        address: "",
        gender: "",
        phone: "",
        avatarFile: null as File | null,
        avatarPreview: "",
    });

    const [editMode, setEditMode] = useState(false);

    const [updatePatient, { loading: updating }] = useMutation(UPDATE_PATIENT_BY_ID, {
        refetchQueries: [
            {
                query: GET_PATIENT_BY_ID,
                variables: { input: { patient_id: session?.user?.id } },
            },
        ],
        awaitRefetchQueries: true,
        onCompleted: () => {
            alert("Cập nhật thành công!");
            setEditMode(false);
        },
        onError: (err) => {
            alert(`Cập nhật thất bại: ${err.message}`);
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prev) => ({
                    ...prev,
                    avatarFile: file,
                    avatarPreview: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = () => {
        if (user && patient) {
            setForm({
                full_name: user.full_name || "",
                date_of_birth: user.date_of_birth?.slice(0, 10) || "",
                address: user.address || "",
                gender: patient.gender || "",
                phone: user.phone || "",
                avatarFile: null,
                avatarPreview: "",
            });
        }
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setForm({
            full_name: "",
            date_of_birth: "",
            address: "",
            gender: "",
            phone: "",
            avatarFile: null,
            avatarPreview: "",
        });
    };

    const isValidPhone = (phone: string): boolean => {
        const phoneRegex = /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
        return phoneRegex.test(phone);
    };

    const uploadAvatar = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
        });
        if (!res.ok) throw new Error("Upload ảnh thất bại");
        const result = await res.json();
        return result.url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidPhone(form.phone)) {
            alert("Số điện thoại không hợp lệ.");
            return;
        }

        let avatarUrl = user?.avatar || "";
        if (form.avatarFile) {
            avatarUrl = await uploadAvatar(form.avatarFile);
        }

        await updatePatient({
            variables: {
                input: {
                    patient_id: session?.user?.id,
                    gender: form.gender || undefined,
                    user: {
                        full_name: form.full_name,
                        date_of_birth: form.date_of_birth,
                        address: form.address,
                        phone: form.phone,
                        avatar: avatarUrl,
                    },
                },
            },
        });
    };

    const translateGender = (g: string) => {
        switch (g?.toUpperCase()) {
            case "MALE": return "Nam";
            case "FEMALE": return "Nữ";
            case "OTHER": return "Khác";
            default: return "N/A";
        }
    };

    return (
        <Profile
            loading={loading}
            error={error}
            user={user}
            patient={patient}
            form={form}
            editMode={editMode}
            updating={updating}
            handleInputChange={handleInputChange}
            handleAvatarChange={handleAvatarChange}
            handleEditClick={handleEditClick}
            handleCancelClick={handleCancelClick}
            handleSubmit={handleSubmit}
            translateGender={translateGender}
        />
    );
}
