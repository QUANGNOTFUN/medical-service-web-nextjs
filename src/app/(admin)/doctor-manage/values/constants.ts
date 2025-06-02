import { HeaderAdminTable } from "@/app/(admin)/_components/Search&ActionTable/AdminTable";
import { AdminFormProps } from "@/app/(admin)/_components/Create&UpdateForm/AdminForm";
import { CreateDoctorInput, UpdateDoctorInput } from "@/types/doctors";

export const HEADER_TABLE_DOCTOR: HeaderAdminTable[] = [
	{ label: "ID", key: "id" },
	{ label: "Email", key: "user.email" },
	{ label: "Họ và tên", key: "user.full_name" },
	{ label: "Số điện thoại", key: "user.phone" },
	{ label: "Địa chỉ", key: "user.address" },
	{ label: "Giới tính", key: "user.gender" },
	{ label: "Ngày sinh", key: "user.date_of_birth" },
	{ label: "Chứng chỉ", key: "qualifications" },
	{ label: "Thâm niên làm việc", key: "work_seniority" },
	{ label: "Chuyên ngành", key: "specialty" },
	{ label: "Nơi làm việc", key: "hospital" },
];

export const INIT_CREATE_DOCTOR_FORM = (users: { id: string, full_name: string, email: string }[]): AdminFormProps<CreateDoctorInput> => ({
	title: "Thêm mới bác sĩ",
	fields: [
		{
			label: "Chọn người dùng",
			key: "user_id",
			type: "select",
			options: users.map(user => ({
				label: `${user.full_name} (${user.email})`,
				value: user.id,
			}))
		},
		{ label: "Chứng chỉ", key: "qualifications", type: "text" },
		{ label: "Thâm niên làm việc", key: "work_seniority", type: "number" },
		{ label: "Chuyên ngành", key: "specialty", type: "text" },
		{ label: "Nơi làm việc", key: "hospital", type: "text" },
	],
	submitLabel: "Tạo",
});


export const INIT_UPDATE_DOCTOR_FORM: AdminFormProps<UpdateDoctorInput> = {
	title: "Cập nhật bác sĩ",
	fields: [
		{ label: "Chứng chỉ", key: "qualifications", type: "text" },
		{ label: "Thâm niên làm việc", key: "work_seniority", type: "number" },
		{ label: "Chuyên ngành", key: "specialty", type: "text" },
		{ label: "Nơi làm việc", key: "hospital", type: "text" },
	],
	submitLabel: "Cập nhật",
};