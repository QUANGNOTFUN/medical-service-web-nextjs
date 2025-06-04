"use client"
import {Doctor} from "@/types/doctors";
import {useState} from "react";

export interface DoctorScheduleFilterProps {
	doctors: Doctor[];
}

export default function DoctorScheduleFilter(){
	const [isShow, setIsShow] = useState<boolean>(false);
	const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
	
	return (
		<div className={""}>
			<h2>Filter</h2>
		</div>
	)
}