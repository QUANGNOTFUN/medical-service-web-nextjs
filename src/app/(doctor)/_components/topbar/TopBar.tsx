'use client'

export default function TopbarDoctor() {
    return (
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
            <span className="text-gray-500 text-sm">Doctor Dashboard | 06 June 2025</span>
            <div className="flex gap-4 items-center">
                <input type="text" placeholder="Search..." className="border px-3 py-1 rounded text-sm" />
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
            </div>
        </header>
    )
}
