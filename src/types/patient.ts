import {TreatmentPlan} from "@/types/treatment_plan";

export interface Patient {
    patient_id: string;
    plan_id?: number | null;
    plan?: TreatmentPlan | null;
}