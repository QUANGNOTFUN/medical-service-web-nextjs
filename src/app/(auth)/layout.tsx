import '../globals.css';
import {LoadingProvider} from "@/app/context/loadingContext";
import Providers from "../../../providers";
import GlobalLoading from "@/components/loadings/globalLoading";

export const metadata = {
    title: 'Medical Service',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
        <body>
        <Providers>
            <LoadingProvider>
                <GlobalLoading />
                { children }
            </LoadingProvider>
        </Providers>
        </body>
        </html>
    );
}
