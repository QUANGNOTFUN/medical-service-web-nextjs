import {HeaderAdminTable} from "@/app/(admin)/_components/Search&ActionTable/AdminTable";
import {CreateMedicationInput, UpdateMedicationInput} from "@/types/medications";
import {AdminFormProps} from "@/app/(admin)/_components/Create&UpdateForm/AdminForm";
import {RegisterDoctor, RegisterDoctorInput} from "@/types/register";

export const HEADER_TABLE_DOCTOR: HeaderAdminTable[] = [
	{ label: "ID", key: "id" },
	{ label: "Email", key: "email" },
	{ label: "Họ và tên", key: "full_name" },
	{ label: "Số điện thoại", key: "phone" },
	{ label: "Địa chỉ", key: "address" },
	{ label: "Giới tính", key: "gender" },
	{ label: "Ngày sinh", key: "date_of_birth" },
	{ label: "Chứng ", key: "qualifications" },
	{ label: "thâm niên làm việc", key: "work_seniority" },
	{ label: "Chuyên ngành", key: "specialty" },
	{ label: "Nơi làm việc", key: "hospital" },
]

export const INIT_CREATE_DOCTOR_FORM: AdminFormProps<RegisterDoctorInput> = {
	title: "Thêm mới thuốc",
	fields: [
		{ label: "Họ và tên", key: "full_name",  type: "text" },
		{ label: "Email", key: "email", type: "text" },
		{ label: "Mật khẩu", key: "password",  type: "password" },
		{ label: "Giới tính", key: "gender",  type: "text" },
		{ label: "Vai trò", key: "role",  type: "text" },
	],
	submitLabel: "Tạo"
}

export const INIT_UPDATE_DOCTOR_FORM: AdminFormProps<UpdateMedicationInput> = {
	title: "Cập nhật thuốc",
	fields: [
		{ label: "ID", key: "id" },
		{ label: "Email", key: "email" },
		{ label: "Họ và tên", key: "full_name" },
		{ label: "Số điện thoại", key: "phone" },
		{ label: "Địa chỉ", key: "address" },
		{ label: "Giới tính", key: "gender" },
		{ label: "Ngày sinh", key: "date_of_birth" },
		{ label: "Chứng ", key: "qualifications" },
		{ label: "thâm niên làm việc", key: "work_seniority" },
		{ label: "Chuyên ngành", key: "specialty" },
		{ label: "Nơi làm việc", key: "hospital" },
	],
	submitLabel: "Cập nhật"
}