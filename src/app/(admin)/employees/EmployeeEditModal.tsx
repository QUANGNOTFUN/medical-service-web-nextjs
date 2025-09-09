"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: String!, $data: UpdateEmployeeInput!) {
    updateEmployee(id: $id, data: $data) {
      full_name
      dob
      gender
      place_of_birth
      hometown
      nationality
      ethnicity
      religion
      marital_status
      health_status
      avatar_url
    }
  }
`;

const UPDATE_POSITION_ASSIGNMENT = gql`
  mutation UpdatePositionAssignment($input: UpdatePositionAssignmentInput!) {
    updatePositionAssignment(updatePositionAssignmentInput: $input) {
      employee_id
      department_id
      position_id
      active
    }
  }
`;

const schema = yup.object().shape({
    full_name: yup.string().required("Họ tên bắt buộc"),
    dob: yup
        .string()
        .nullable()
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Ngày sinh không hợp lệ"),
    // ✅ thêm "other" để khớp với UI
    gender: yup.string().oneOf(["male", "female", "other"]).required("Giới tính bắt buộc"),
    place_of_birth: yup.string(),
    hometown: yup.string(),
    nationality: yup.string(),
    ethnicity: yup.string(),
    religion: yup.string(),
    marital_status: yup.string(),
    health_status: yup.string(),
    avatar_url: yup.string().url("URL ảnh không hợp lệ").nullable(),
});

export default function EmployeeEditModal({ employee, onClose, onUpdated }: any) {
    const [updateEmployee, { loading: employeeLoading }] = useMutation(UPDATE_EMPLOYEE, {
        refetchQueries: ["GetEmployees"],
    });
    const [updateAssignment, { loading: assignmentLoading }] = useMutation(UPDATE_POSITION_ASSIGNMENT, {
        refetchQueries: ["GetEmployees"],
    });

    const { data: optionsData, loading: optionsLoading, error: optionsError } = useQuery(gql`
    query {
      departments {
        department_id
        department_name
      }
      positions {
        position_id
        position_name
      }
    }
  `);

    const departments = optionsData?.departments || [];
    const positions = optionsData?.positions || [];

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { assignments: [] as string[] },
    });

    useEffect(() => {
        if (employee) {
            // ✅ chỉ pre-check các assignment đang active
            const activeAssignments: string[] =
                employee.positionAssignments
                    ?.filter((pa: any) => pa?.active)
                    .map((pa: any) => `${pa.department?.department_id}:${pa.position?.position_id}`) || [];

            reset({
                full_name: employee.full_name || "",
                dob: employee.dob ? new Date(employee.dob).toISOString().split("T")[0] : "",
                gender: (employee.gender?.toLowerCase() as "male" | "female" | "other") || "other",
                place_of_birth: employee.place_of_birth || "",
                hometown: employee.hometown || "",
                nationality: employee.nationality || "",
                ethnicity: employee.ethnicity || "",
                religion: employee.religion || "",
                marital_status: employee.marital_status || "",
                health_status: employee.health_status || "",
                avatar_url: employee.avatar_url || "",
                assignments: activeAssignments,
            });
        }
    }, [employee, reset]);

    const selectedAssignments = watch("assignments", []);

    const onSubmit = async (values: any) => {
        try {
            const { assignments, __typename, positionAssignments, employee_id, ...cleanData } = values;

            // ✅ danh sách assignment đang active TRƯỚC khi cập nhật
            const prevActiveAssignments: string[] =
                employee.positionAssignments
                    ?.filter((pa: any) => pa?.active)
                    .map((pa: any) => `${pa.department?.department_id}:${pa.position?.position_id}`) || [];

            // 1) Cập nhật thông tin nhân sự
            const res = await updateEmployee({
                variables: {
                    id: employee.employee_id,
                    data: cleanData,
                },
            });

            // Danh sách mới từ form
            const newAssignments: string[] = Array.from(new Set(assignments || []));

            // 2) Tính phần thêm / bớt dựa trên ACTIVE hiện tại
            const toAdd = newAssignments.filter((a) => !prevActiveAssignments.includes(a));
            const toRemove = prevActiveAssignments.filter((a) => !newAssignments.includes(a));

            // 3) Gọi mutation set active = true cho phần thêm
            for (const key of toAdd) {
                const [department_id, position_id] = key.split(":");
                await updateAssignment({
                    variables: {
                        input: {
                            employee_id: employee.employee_id,
                            department_id,
                            position_id,
                            active: true,
                        },
                    },
                });
            }

            // 4) Gọi mutation set active = false cho phần bớt
            for (const key of toRemove) {
                const [department_id, position_id] = key.split(":");
                await updateAssignment({
                    variables: {
                        input: {
                            employee_id: employee.employee_id,
                            department_id,
                            position_id,
                            active: false,
                        },
                    },
                });
            }

            onUpdated?.(res.data.updateEmployee);
            onClose();
        } catch (err) {
            console.error("Error updating employee:", err);
            alert("Lỗi khi cập nhật nhân sự. Vui lòng thử lại.");
        }
    };

    if (optionsLoading) return <div className="p-4">Đang tải dữ liệu...</div>;
    if (optionsError) return <div className="p-4 text-red-500">Lỗi: {optionsError.message}</div>;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Chỉnh sửa nhân sự</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Họ tên</label>
                        <input {...register("full_name")} className="w-full border rounded-md px-3 py-2" />
                        {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                        <input type="date" {...register("dob")} className="w-full border rounded-md px-3 py-2" />
                        {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Giới tính</label>
                        <select {...register("gender")} className="w-full border rounded-md px-3 py-2">
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Nơi sinh</label>
                        <input {...register("place_of_birth")} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Quê quán</label>
                        <input {...register("hometown")} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Quốc tịch</label>
                        <input {...register("nationality")} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Dân tộc</label>
                        <input {...register("ethnicity")} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tôn giáo</label>
                        <input {...register("religion")} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tình trạng hôn nhân</label>
                        <input {...register("marital_status")} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tình trạng sức khỏe</label>
                        <input {...register("health_status")} className="w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Ảnh đại diện (URL)</label>
                        <input {...register("avatar_url")} className="w-full border rounded-md px-3 py-2" />
                        {errors.avatar_url && <p className="text-red-500 text-xs">{errors.avatar_url.message}</p>}
                    </div>

                    <div>
                        <h3 className="text-md font-semibold mt-6 mb-2">Phân công phòng ban & chức vụ</h3>
                        {departments.map((d: any) => (
                            <div key={d.department_id} className="mb-4">
                                <h4 className="font-medium">{d.department_name}</h4>
                                <div className="ml-4 space-y-2">
                                    {positions.map((p: any) => {
                                        const key = `${d.department_id}:${p.position_id}`;
                                        const checked = selectedAssignments.includes(key);
                                        return (
                                            <label key={key} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={checked}
                                                    onChange={(e) => {
                                                        const current: string[] = selectedAssignments || [];
                                                        if (e.target.checked) {
                                                            // tránh trùng key
                                                            const next = Array.from(new Set([...current, key]));
                                                            setValue("assignments", next, { shouldDirty: true });
                                                        } else {
                                                            setValue(
                                                                "assignments",
                                                                current.filter((k) => k !== key),
                                                                { shouldDirty: true }
                                                            );
                                                        }
                                                    }}
                                                />
                                                {p.position_name}
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={employeeLoading || assignmentLoading}
                            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-500 disabled:bg-gray-400"
                        >
                            {employeeLoading || assignmentLoading ? "Đang lưu..." : "Cập nhật"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
