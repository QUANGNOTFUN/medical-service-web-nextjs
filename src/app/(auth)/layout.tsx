import '../globals.css';
import ApolloWrapper from "@/components/apollo/ApolloWrapper";

export const metadata = {
    title: 'Medical Service',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
        <body>
        <ApolloWrapper>{children}</ApolloWrapper>
        </body>
        </html>
    );
}
