import { useMutation } from "@apollo/client";
import { RegisterDoctorInput } from "@/types/register";
import {CREATE_DOCTOR} from "@/libs/graphqls/doctors";

export function useRegisterDoctor() {
	const [registerAccount, { data, loading, error }] = useMutation<RegisterDoctorInput>(CREATE_DOCTOR);

	const register = async (input: RegisterDoctorInput) =>
		registerAccount({
				variables: { input },
		});

	return {
		register,
		data: data,
		loading,
		error,
	};
}
