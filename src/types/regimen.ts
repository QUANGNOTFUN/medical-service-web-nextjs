export interface CreateRegimenInput{
    case_stage: string;
    regimen_type: string;
    medication_list: string;
    user_guide: string;
    is_default: boolean;
}