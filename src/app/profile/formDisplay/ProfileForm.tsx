export default function ProfileForm({ form, handleInputChange }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleInputChange}
                    className="mt-1 w-full border rounded px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                <input
                    type="date"
                    name="date_of_birth"
                    value={form.date_of_birth}
                    onChange={handleInputChange}
                    className="mt-1 w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                <textarea
                    name="address"
                    rows={2}
                    value={form.address}
                    onChange={handleInputChange}
                    className="mt-1 w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    className="mt-1 w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Giới tính</label>
                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleInputChange}
                    className="mt-1 w-full border rounded px-3 py-2"
                >
                    <option value="">Chọn giới tính</option>
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                </select>
            </div>
        </div>
    );
}
