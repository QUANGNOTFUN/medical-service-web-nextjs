"use client";

import { useState, useEffect } from "react";
import { CreateExaminationReportInput, MedicalExaminationInput } from "@/types/examination_report";
import { CreateTreatmentPlanInput } from "@/types/treatment_plan";
import { CreateRegimenInput } from "@/types/regimen";
import { useGetTreatmentPlan } from "@/libs/hooks/treatmentPlan/useGetTreatmentPlan";

interface Props {
    onSubmit: (input: MedicalExaminationInput) => void;
    onClose: () => void;
    patient_id: string;
    doctor_id: string;
}

export default function MedicalExaminationForm({ onSubmit, onClose, patient_id,doctor_id }: Props) {
    const [treatmentPlan, setTreatmentPlan] = useState<CreateTreatmentPlanInput>({
        name: "",
        hiv_diagnosis_date: undefined,
        start_date: undefined,
        end_date: undefined,
        notes: "",
    });

    const [regimen, setRegimen] = useState<CreateRegimenInput>({
        care_stage: "",
        regimen_type: "",
        medication_list: "",
        user_guide: "",
        is_default: false,
    });

    const [report, setReport] = useState<CreateExaminationReportInput>({
        name: "",
        doctor_id: doctor_id,
        risk_assessment: "",
        is_HIV: false,
        HIV_test_file: "",
        regimen_id: 0,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const { patient, plan, loading } = useGetTreatmentPlan(patient_id);

    // Gán plan sẵn có vào state khi load
    useEffect(() => {
        if (plan) {
            setTreatmentPlan({
                name: plan.name || "",
                hiv_diagnosis_date: plan.hiv_diagnosis_date ? new Date(plan.hiv_diagnosis_date) : undefined,
                start_date: new Date(plan.start_date),
                end_date: plan.end_date ? new Date(plan.end_date) : undefined,
                notes: plan.notes || "",
            });

            setReport((prev) => ({
                ...prev,
                treatment_plan_id: plan.id.toString(), // dùng string để bind input
            }));
        }
    }, [plan]);

    const handleSubmit = () => {
        const newErrors: Record<string, string> = {};

        // Validate treatmentPlan
        if (!treatmentPlan.name.trim()) newErrors.treatmentPlan_name = "Tên kế hoạch không được để trống";
        if (!treatmentPlan.start_date) newErrors.treatmentPlan_start = "Ngày bắt đầu không được để trống";
        if (!treatmentPlan.hiv_diagnosis_date) newErrors.treatmentPlan_hiv = "Ngày chẩn đoán HIV không được để trống";
        if (!treatmentPlan.end_date) newErrors.treatmentPlan_end = "Ngày kết thúc không được để trống";
        if (!treatmentPlan.notes.trim()) newErrors.treatmentPlan_notes = "Ghi chú không được để trống";

        // Validate regimen
        if (!regimen.care_stage.trim()) newErrors.regimen_care = "Giai đoạn ca bệnh không được để trống";
        if (!regimen.regimen_type.trim()) newErrors.regimen_type = "Phải chọn loại phác đồ";
        if (!regimen.medication_list.trim()) newErrors.regimen_medication = "Danh sách thuốc không được để trống";
        if (!regimen.user_guide.trim()) newErrors.regimen_guide = "Hướng dẫn sử dụng không được để trống";

        // Validate report
        if (!report.name.trim()) newErrors.report_name = "Tên phiếu khám không được để trống";
        if (!report.doctor_id.trim()) newErrors.report_doctor = "ID bác sĩ không được để trống";
        if (!report.risk_assessment.trim()) newErrors.report_risk = "Đánh giá rủi ro không được để trống";
        if (!report.HIV_test_file.trim()) newErrors.report_file = "File xét nghiệm HIV không được để trống";
        if (!report.regimen_id || report.regimen_id <= 0) newErrors.report_regimen = "Regimen ID không hợp lệ";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmit({ treatmentPlan, regimen, report });
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30">
            <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">Phiếu Khám Lâm Sàng</h2>

                {/* Thông báo nếu đã có plan */}
                {plan && (
                    <div className="text-green-700 font-semibold mb-6 text-center">
                        Bệnh nhân đã có kế hoạch điều trị. Bạn có thể chỉnh sửa nếu cần.
                    </div>
                )}

                {/* Treatment Plan */}
                <section className="mb-10">
                    <h3 className="text-xl font-semibold mb-4">🩺 Kế hoạch điều trị</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-1">Tên kế hoạch</label>
                            <input
                                className={`input border-2 w-full ${errors.treatmentPlan_name ? "border-red-500" : ""}`}
                                placeholder={"Nhập tên kế hoạch"}
                                value={treatmentPlan.name}
                                onChange={(e) => setTreatmentPlan({ ...treatmentPlan, name: e.target.value })}
                            />
                            {errors.treatmentPlan_name && (
                                <p className="text-red-500 text-sm mt-1">{errors.treatmentPlan_name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Ngày bắt đầu</label>
                            <input
                                type="date"
                                className={`input w-full ${errors.treatmentPlan_start ? "border-red-500" : ""}`}
                                value={treatmentPlan.start_date ? treatmentPlan.start_date.toISOString().split("T")[0] : ""}
                                onChange={(e) =>
                                    setTreatmentPlan({ ...treatmentPlan, start_date: new Date(e.target.value) })
                                }
                            />
                            {errors.treatmentPlan_start && (
                                <p className="text-red-500 text-sm mt-1">{errors.treatmentPlan_start}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Ngày chẩn đoán HIV</label>
                            <input
                                type="date"
                                className="input w-full"
                                value={
                                    treatmentPlan.hiv_diagnosis_date
                                        ? treatmentPlan.hiv_diagnosis_date.toISOString().split("T")[0]
                                        : ""
                                }
                                onChange={(e) =>
                                    setTreatmentPlan({ ...treatmentPlan, hiv_diagnosis_date: new Date(e.target.value) })
                                }
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Ngày kết thúc</label>
                            <input
                                type="date"
                                className="input w-full"
                                value={
                                    treatmentPlan.end_date ? treatmentPlan.end_date.toISOString().split("T")[0] : ""
                                }
                                onChange={(e) =>
                                    setTreatmentPlan({ ...treatmentPlan, end_date: new Date(e.target.value) })
                                }
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block font-medium mb-1">Ghi chú</label>
                            <textarea
                                className="input w-full"
                                rows={3}
                                value={treatmentPlan.notes}
                                onChange={(e) => setTreatmentPlan({ ...treatmentPlan, notes: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                {/* Regimen */}
                <section className="mb-10">
                    <h3 className="text-xl font-semibold mb-4">💊 Phác đồ điều trị</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-1">Giai đoạn ca bệnh</label>
                            <input
                                className={`input w-full ${errors.regimen_care ? "border-red-500" : ""}`}
                                value={regimen.care_stage}
                                onChange={(e) => setRegimen({ ...regimen, care_stage: e.target.value })}
                            />
                            {errors.regimen_care && (
                                <p className="text-red-500 text-sm mt-1">{errors.regimen_care}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Loại phác đồ</label>
                            <select
                                className={`input w-full ${errors.regimen_type ? "border-red-500" : ""}`}
                                value={regimen.regimen_type}
                                onChange={(e) => setRegimen({ ...regimen, regimen_type: e.target.value })}
                            >
                                <option value="">-- Chọn --</option>
                                <option value="ARV">ARV</option>
                                <option value="PrEP">PrEP</option>
                                <option value="PEP">PEP</option>
                            </select>
                            {errors.regimen_type && (
                                <p className="text-red-500 text-sm mt-1">{errors.regimen_type}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Danh sách thuốc</label>
                            <input
                                className="input w-full"
                                value={regimen.medication_list}
                                onChange={(e) => setRegimen({ ...regimen, medication_list: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Hướng dẫn sử dụng</label>
                            <input
                                className="input w-full"
                                value={regimen.user_guide}
                                onChange={(e) => setRegimen({ ...regimen, user_guide: e.target.value })}
                            />
                        </div>

                        <div className="col-span-2 flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={regimen.is_default}
                                onChange={(e) => setRegimen({ ...regimen, is_default: e.target.checked })}
                            />
                            <span>Mặc định?</span>
                        </div>
                    </div>
                </section>

                {/* Report */}
                <section className="mb-10">
                    <h3 className="text-xl font-semibold mb-4">📝 Phiếu khám</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-1">Tên phiếu khám</label>
                            <input
                                className={`input w-full ${errors.report_name ? "border-red-500" : ""}`}
                                value={report.name}
                                onChange={(e) => setReport({ ...report, name: e.target.value })}
                            />
                            {errors.report_name && (
                                <p className="text-red-500 text-sm mt-1">{errors.report_name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium mb-1">ID Bác sĩ</label>
                            <input
                                className={`input w-full ${errors.report_doctor ? "border-red-500" : ""}`}
                                value={report.doctor_id}
                                onChange={(e) => setReport({ ...report, doctor_id: e.target.value })}
                            />
                            {errors.report_doctor && (
                                <p className="text-red-500 text-sm mt-1">{errors.report_doctor}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Đánh giá rủi ro</label>
                            <input
                                className="input w-full"
                                value={report.risk_assessment}
                                onChange={(e) => setReport({ ...report, risk_assessment: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center gap-2 mt-6">
                            <input
                                type="checkbox"
                                checked={report.is_HIV}
                                onChange={(e) => setReport({ ...report, is_HIV: e.target.checked })}
                            />
                            <span>Dương tính HIV?</span>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">File xét nghiệm HIV</label>
                            <input
                                className="input w-full"
                                value={report.HIV_test_file}
                                onChange={(e) => setReport({ ...report, HIV_test_file: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Regimen ID</label>
                            <input
                                type="number"
                                className="input w-full"
                                value={report.regimen_id}
                                onChange={(e) => setReport({ ...report, regimen_id: +e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                        Tạo
                    </button>
                </div>
            </div>
        </div>
    );
}
