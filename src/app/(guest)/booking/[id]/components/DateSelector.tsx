'use client';

import React from 'react';

interface DateSelectorProps {
    doctorId: string;
    selectedDate: string | null;
    onDateChange: (date: string) => void;
    availableDates: string[];
}

const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

const DateSelector: React.FC<DateSelectorProps> = ({
                                                       selectedDate,
                                                       onDateChange,
                                                       availableDates,
                                                   }) => {
    if (!availableDates || availableDates.length === 0) {
        return <p>Không có ngày khám khả dụng.</p>;
    }

    return (
        <div className="grid grid-cols-4 gap-2 mb-4">
            {availableDates.map((dateStr) => {
                const date = new Date(dateStr);
                return (
                    <button
                        key={dateStr}
                        type="button"
                        onClick={() => onDateChange(dateStr)}
                        className={`py-2 px-3 rounded border text-center ${
                            selectedDate === dateStr
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700'
                        }`}
                    >
                        {date.getDate().toString().padStart(2, '0')}/
                        {(date.getMonth() + 1).toString().padStart(2, '0')}
                        <br />
                        {days[date.getDay()]}
                    </button>
                );
            })}
        </div>
    );
};

export default DateSelector;
