import REGISTER_MUTATION from "@/libs/graphqls/mutations/registerMutations";
import {RegisterDoctorInput} from "@/types/register";
import {useMutation} from "@apollo/client";
import {CREATE_DOCTOR} from "@/libs/graphqls/doctors";
import {CreateDoctorInput} from "@/types/doctors";

export function useRegisterDoctor() {
	const [registerAccount, { data, loading, error }] = useMutation<{input: RegisterDoctorInput}>(REGISTER_MUTATION);
	const [createDoctor, { data: dataDoctor, loading: loadingDoctor, error: errorDoctor }] = useMutation<{user_id: string}>(CREATE_DOCTOR);
	
	const register = (userData: CreateDoctorInput) => registerAccount({variables: {userData}});
	const create = (user_id: string) => createDoctor({variables: {doctorData: {user_id}}});
	
	return {
		register,
		data: data?.input,
		loading ,
		error,
	}
}