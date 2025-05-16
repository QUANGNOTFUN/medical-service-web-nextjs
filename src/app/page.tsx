import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Phim Suýt Hay - Home",
    description: "Watch trending movies online",
};

export default function RootPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">Welcome Phim Suýt Hay</h1>
            <Link href="/home">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    XEM PHIM
                </button>
            </Link>
        </div>
    );
}