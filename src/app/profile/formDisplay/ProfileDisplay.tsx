export default function ProfileDisplay({ user, patient }: any) {
    const translateGender = (gender: string) => {
        switch (gender) {
            case "MALE":
                return "Nam";
            case "FEMALE":
                return "Nữ";
            case "OTHER":
                return "Khác";
            default:
                return "N/A";
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm text-gray-500">Ngày sinh</label>
                <p className="text-gray-800">{user.date_of_birth?.slice(0, 10) || "N/A"}</p>
            </div>
            <div>
                <label className="block text-sm text-gray-500">Địa chỉ</label>
                <p className="text-gray-800">{user.address || "N/A"}</p>
            </div>
            <div>
                <label className="block text-sm text-gray-500">Giới tính</label>
                <p className="text-gray-800">{translateGender(patient.gender)}</p>
            </div>
            <div>
                <label className="block text-sm text-gray-500">Số điện thoại</label>
                <p className="text-gray-800">{user.phone || "N/A"}</p>
            </div>
        </div>
    );
}
