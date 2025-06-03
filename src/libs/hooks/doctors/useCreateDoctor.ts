import { useMutation } from "@apollo/client";
import { RegisterDoctorInput } from "@/types/register";
import {CREATE_DOCTOR} from "@/libs/graphqls/doctors";

interface RegisterDoctorResponse {
	registerDoctor: {
		id: string;
		user: {
			id: string;
			email: string;
			full_name: string;
			gender: string;
			role: string;
		};
		qualifications?: string | null;
		work_seniority?: number | null;
		specialty?: string | null;
		hospital?: string | null;
	};
}

interface RegisterDoctorVariables {
	input: RegisterDoctorInput;
}

export function useRegisterDoctor() {
	const [registerAccount, { data, loading, error }] = useMutation<
		RegisterDoctorResponse,
		RegisterDoctorVariables
	>(CREATE_DOCTOR);

	const register = async (input: RegisterDoctorInput) => {
		try {
			const response = await registerAccount({
				variables: { input },
			});
			return response.data?.registerDoctor;
		} catch (err: any) {
			throw new Error(`Failed to register doctor: ${err.message}`);
		}
	};

	return {
		register,
		data: data?.registerDoctor,
		loading,
		error,
	};
}
