import {HeaderAdminTable} from "@/app/(admin)/_components/Search&ActionTable/AdminTable";
import {AdminFormProps} from "@/app/(admin)/_components/Create&UpdateForm/AdminForm";
import {CreateDoctorInput, UpdateDoctorInput} from "@/types/doctors";
import {RegisterDoctorInput} from "@/types/register";

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

export const INIT_CREATE_DOCTOR_FORM: AdminFormProps<RegisterDoctorInput & CreateDoctorInput> = {
	title: "Thêm tài khoản bác sĩ",
	fields: [
		{ label: "Họ và tên", key: "full_name",  type: "text" },
		{ label: "Email", key: "email", type: "text" },
		{ label: "Mật khẩu", key: "password",  type: "password" },
		{ label: "Giới tính", key: "gender",  type: "select", options: ["MALE", "FEMALE", "OTHER"] },
		{ label: "Role", key: "role",  type: "select", options: ["DOCTOR"] },
	],
	submitLabel: "Tạo"
};


export const INIT_UPDATE_DOCTOR_FORM: AdminFormProps<UpdateDoctorInput> = {
	title: "Cập nhật bác sĩ",
	fields: [
		{ label: "Họ và tên", key: "full_name",  type: "text" },
		{ label: "Email", key: "email", type: "text" },
		{ label: "Giới tính", key: "gender",  type: "select", options: ["MALE", "FEMALE", "OTHER"] },
		{ label: "Bằng cấp", key: "qualifications", type: "text" },
		{ label: "Kinh nghiệm", key: "work_seniority", type: "number" },
		{ label: "Chuyên khoa", key: "specialty", type: "text" },
		{ label: "Bệnh viện", key: "hospital", type: "text" },
	],
	submitLabel: "Cập nhật"
}