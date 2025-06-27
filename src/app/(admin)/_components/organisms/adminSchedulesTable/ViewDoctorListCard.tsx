import {Minimize2Icon} from "lucide-react";

type ViewDoctorListCardProps = {
	label: string;
	doctor: { id: string; full_name: string }[];
	onSelect?: (doctor: { id: string; name: string }) => void;
	onClose: () => void; // Thêm hàm đóng
};

export function ViewDoctorListCard(
	{ label, doctor, onSelect, onClose }: ViewDoctorListCardProps
) {
	const handleSelect = (doctor: { id: string; full_name: string }) => {
		if (onSelect) {
			onSelect({ id: doctor.id, name: doctor.full_name });
		}
	};
	const rowCount = Math.ceil(doctor.length / 8);
	return (
		<div
			onClick={onClose}
			className={"fixed top-0 left-0 w-full h-screen bg-zinc-900/60 flex items-center justify-center z-50"}
		>
			<div className={"relative p-6 rounded-sm max-w-[90%] min-h-[30%] overflow-y-auto bg-white dark:bg-gray-800"}>
				<h3 className="text-lg font-bold text-center text-gray-900 dark:text-gray-100 mb-2">{label}</h3>
				<button
					onClick={onClose}
					className={"absolute top-1 right-1 p-1 rounded-sm shadow-sm cursor-pointer text-gray-800 dark:text-white hover:text-white dark:hover:text-red-300" +
						" bg-zinc-100 dark:bg-gray-800 hover:bg-violet-200 dark:hover:bg-gray-600 "}
				>
					<Minimize2Icon size={12} />
				</button>
				<div className={`grid grid-cols-${rowCount} gap-4 py-4 px-2`}>
					{doctor.map((doctor) => (
						<div
							key={doctor.id}
							className={"p-2 rounded-md shadow-md cursor-pointer border border-gray-400 " +
								"hover:bg-zinc-200 dark:hover:bg-gray-600 bg-zinc-50 dark:bg-gray-700 " +
								"text-sm md:text-base wrap-break-word text-center text-black dark:text-white"}
							onClick={() => handleSelect(doctor)}
						>
							{doctor.full_name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}