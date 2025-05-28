import '../globals.css';
import { Providers } from './providers';
import ApolloWrapper from "@/components/apollo/ApolloWrapper";

export const metadata = {
    title: 'Medical Service',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ApolloWrapper>{children}</ApolloWrapper>
        </body>
        </html>
    );
}
