import React, { useMemo, useState } from 'react';
import { useTable, useFilters, Column } from 'react-table';
import { CreateDoctorInput } from '@/types/doctors';

interface User {
  id: string;
  full_name: string;
  email: string;
}

interface DoctorCreateTableProps {
  users: User[];
  onClose: () => void;
  onSubmit: (data: CreateDoctorInput[]) => void;
}

// Component lọc mặc định
const DefaultColumnFilter = ({ column: { filterValue, setFilter } }: any) => {
  return (
    <input
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value || undefined)}
      placeholder="Lọc..."
      className="border rounded p-1 w-full"
    />
  );
};

const DoctorCreateTable: React.FC<DoctorCreateTableProps> = ({ users, onClose, onSubmit }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [formData, setFormData] = useState<{
    qualifications: string;
    work_seniority: number;
    specialty: string;
    hospital: string;
  }>({
    qualifications: '',
    work_seniority: 0,
    specialty: '',
    hospital: '',
  });

  // Định nghĩa cột cho bảng
  const columns: Column<User>[] = useMemo(
    () => [
      {
        Header: 'Chọn',
        accessor: 'id',
        Cell: ({ value }: { value: string }) => (
          <input
            type="checkbox"
            checked={selectedUsers.includes(value)}
            onChange={() => {
              setSelectedUsers(prev =>
                prev.includes(value)
                  ? prev.filter(id => id !== value)
                  : [...prev, value]
              );
            }}
          />
        ),
        disableFilters: true,
      },
      {
        Header: 'Họ và tên',
        accessor: 'full_name',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Email',
        accessor: 'email',
        Filter: DefaultColumnFilter,
      },
    ],
    [selectedUsers]
  );

  // Cấu hình react-table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: users,
      defaultColumn: { filter: DefaultColumnFilter } as Partial<Column<User>>,
    },
    useFilters
  );

  // Xử lý submit
  const handleSubmit = () => {
    if (selectedUsers.length === 0) {
      alert('Vui lòng chọn ít nhất một người dùng!');
      return;
    }
    const createData: CreateDoctorInput[] = selectedUsers.map(userId => ({
      user_id: userId,
      qualifications: formData.qualifications,
      work_seniority: formData.work_seniority,
      specialty: formData.specialty,
      hospital: formData.hospital,
    }));
    onSubmit(createData);
    onClose();
  };

  // Xử lý thay đổi input form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'work_seniority' ? parseInt(value) || 0 : value }));
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Thêm mới bác sĩ</h2>

      {/* Form nhập thông tin chung */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Chứng chỉ</label>
          <input
            name="qualifications"
            value={formData.qualifications}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Thâm niên làm việc</label>
          <input
            name="work_seniority"
            type="number"
            value={formData.work_seniority}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Chuyên ngành</label>
          <input
            name="specialty"
            value={formData.specialty}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Nơi làm việc</label>
          <input
            name="hospital"
            value={formData.hospital}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>

      {/* Bảng danh sách user */}
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="w-full border-collapse">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} className="border p-2 text-left">
                    {column.render('Header')}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="p-2">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Nút hành động */}
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Hủy
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tạo
        </button>
      </div>
    </div>
  );
};

export default DoctorCreateTable;
