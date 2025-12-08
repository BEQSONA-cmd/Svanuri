import "./globals.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
    title: "სვანური ენა",
    description: "თარგმნე სიტყვები სვანურად მარტივად და სწრაფად!",
};

interface AppProps {
    children: ReactNode;
}

export default function App({ children }: AppProps) {
    return (
        <html lang="ka" className="h-full">
            <body className="h-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
                {/* Main Content */}
                <main className="flex-grow">{children}</main>

                {/* Footer */}
                <footer className="bg-gray-800/50 py-4 backdrop-blur-sm">
                    <div className="container mx-auto text-center">
                        <p className="text-gray-400 text-sm">
                            &copy; svanuri.vercel.app | Design by{" "}
                            <a
                                href="https://github.com/BEQSONA-cmd"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                BEQSONA-cmd
                            </a>
                        </p>
                    </div>
                </footer>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </body>
        </html>
    );
}
