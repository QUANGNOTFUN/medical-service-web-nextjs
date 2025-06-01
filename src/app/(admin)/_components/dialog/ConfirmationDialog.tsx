import React from "react";

interface ConfirmationDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
}

export default function ConfirmationDialog({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
}: ConfirmationDialogProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
				<h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
				<p className="text-gray-600 dark:text-gray-300 mb-4">{message}</p>
				<div className="flex justify-end space-x-2">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-300 dark:bg-zinc-400 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-zinc-600"
					>
						Hủy
					</button>
					<button
						onClick={() => {
							onConfirm();
							onClose();
						}}
						className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-600"
					>
						Xác nhận
					</button>
				</div>
			</div>
		</div>
	);
}