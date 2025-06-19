'use client'

import { useEffect, useState } from 'react';

export default function TopbarDoctor() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000); // cập nhật mỗi giây

        return () => clearInterval(interval); // cleanup khi unmount
    }, []);

    return (
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
            <span className="text-gray-500 text-sm font-bold">
                Doctor Dashboard | {time.toLocaleTimeString()}
            </span>
            <div className="flex gap-4 items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border px-3 py-1 rounded text-sm"
                />
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
            </div>
        </header>
    )
}
