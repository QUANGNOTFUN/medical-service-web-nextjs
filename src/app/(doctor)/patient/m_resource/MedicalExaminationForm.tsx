"use client";

import { useState } from "react";
import { CreateExaminationReportInput, MedicalExaminationInput } from "@/types/examination_report";
import { CreateTreatmentPlanInput } from "@/types/treatment_plan";
import { CreateRegimenInput } from "@/types/regimen";

interface Props {
    onSubmit: (input: MedicalExaminationInput) => void;
    onClose: () => void;
    appointmentId: string;
}

export default function MedicalExaminationForm({ onSubmit, onClose, appointmentId }: Props) {
    const [treatmentPlan, setTreatmentPlan] = useState<CreateTreatmentPlanInput>({
        name: "",
        hiv_diagnosis_date: undefined,
        start_date: undefined,
        end_date: undefined,
        notes: "",
    });

    const [regimen, setRegimen] = useState<CreateRegimenInput>({
        case_stage: "",
        regimen_type: "",
        medication_list: "",
        user_guide: "",
        is_default: false,
    });

    const [report, setReport] = useState<CreateExaminationReportInput>({
        name: "",
        doctor_id: "",
        risk_assessment: "",
        is_HIV: false,
        HIV_test_file: "",
        regimen_id: 0,
        treatment_plan_id: "",
    });

    const handleSubmit = () => {
        onSubmit({ treatmentPlan, regimen, report });
    };

    return (
        <div className="fixed inset-5  z-50 overflow-y-auto p-10">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-8 border">
                <h2 className="text-3xl font-bold mb-8 text-center">Phiếu Khám Lâm Sàng</h2>

                {/* Treatment Plan */}
                <section className="mb-10">
                    <h3 className="text-xl font-semibold mb-4">🩺 Kế hoạch điều trị</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-1">Tên kế hoạch</label>
                            <input className="input w-full" value={treatmentPlan.name} onChange={(e) => setTreatmentPlan({ ...treatmentPlan, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Ngày chẩn đoán HIV</label>
                            <input type="date" className="input w-full" onChange={(e) => setTreatmentPlan({ ...treatmentPlan, hiv_diagnosis_date: new Date(e.target.value) })} />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Ngày bắt đầu</label>
                            <input type="date" className="input w-full" onChange={(e) => setTreatmentPlan({ ...treatmentPlan, start_date: new Date(e.target.value) })} />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Ngày kết thúc</label>
                            <input type="date" className="input w-full" onChange={(e) => setTreatmentPlan({ ...treatmentPlan, end_date: new Date(e.target.value) })} />
                        </div>
                        <div className="col-span-2">
                            <label className="block font-medium mb-1">Ghi chú</label>
                            <textarea className="input w-full" rows={3} value={treatmentPlan.notes} onChange={(e) => setTreatmentPlan({ ...treatmentPlan, notes: e.target.value })} />
                        </div>
                    </div>
                </section>

                {/* Regimen */}
                <section className="mb-10">
                    <h3 className="text-xl font-semibold mb-4">💊 Phác đồ điều trị</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-1">Giai đoạn ca bệnh</label>
                            <input className="input w-full" value={regimen.case_stage} onChange={(e) => setRegimen({ ...regimen, case_stage: e.target.value })} />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Loại phác đồ</label>
                            <select className="input w-full" value={regimen.regimen_type} onChange={(e) => setRegimen({ ...regimen, regimen_type: e.target.value })}>
                                <option value="">-- Chọn --</option>
                                <option value="ARV">ARV</option>
                                <option value="PrEP">PrEP</option>
                                <option value="PEP">PEP</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Danh sách thuốc</label>
                            <input className="input w-full" value={regimen.medication_list} onChange={(e) => setRegimen({ ...regimen, medication_list: e.target.value })} />
                        </div>
                        <div>
                            <label className="block font-medium mb-1 ">Hướng dẫn sử dụng</label>
                            <input className="input w-full border-1" value={regimen.user_guide} onChange={(e) => setRegimen({ ...regimen, user_guide: e.target.value })} />
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                            <input type="checkbox" checked={regimen.is_default} onChange={(e) => setRegimen({ ...regimen, is_default: e.target.checked })} />
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
                            <input className="input w-full" value={report.name} onChange={(e) => setReport({ ...report, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">ID Bác sĩ</label>
                            <input className="input w-full" value={report.doctor_id} onChange={(e) => setReport({ ...report, doctor_id: e.target.value })} />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Đánh giá rủi ro</label>
                            <input className="input w-full" value={report.risk_assessment} onChange={(e) => setReport({ ...report, risk_assessment: e.target.value })} />
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                            <input type="checkbox" checked={report.is_HIV} onChange={(e) => setReport({ ...report, is_HIV: e.target.checked })} />
                            <span>Dương tính HIV?</span>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">File xét nghiệm HIV</label>
                            <input className="input w-full" value={report.HIV_test_file} onChange={(e) => setReport({ ...report, HIV_test_file: e.target.value })} />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Regimen ID</label>
                            <input className="input w-full" type="number" value={report.regimen_id} onChange={(e) => setReport({ ...report, regimen_id: +e.target.value })} />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Treatment Plan ID</label>
                            <input className="input w-full" value={report.treatment_plan_id} onChange={(e) => setReport({ ...report, treatment_plan_id: e.target.value })} />
                        </div>
                    </div>
                </section>

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500">Hủy</button>
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Tạo</button>
                </div>
            </div>
        </div>
    );
}
