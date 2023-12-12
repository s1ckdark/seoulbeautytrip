import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
    type: 'success' | 'error' | 'info' | 'warning' | 'action';
    message?: string;
    func: () => void;
}

export const Toast = (type: string, message: string, func?: () => void) => {
    switch (type) {
        case 'success':
            toast.success(message || "Success!", {
                onClose: () => {
                    func && func();
                },
                autoClose: 3000
            });
            break;
        case 'error':
            toast.error(message || "Error!", {
                onClose: () => {
                    func && func();
                },
                autoClose: 3000
            });
            break;
        case 'info':
            toast.info(message || "Info!", {
                onClose: () => {
                    func && func();
                },
                autoClose: 3000
            });
            break;
        case 'warning':
            toast.warning(message || "Warning!", {
                onClose: () => {
                    func && func();
                },
                autoClose: 3000
            });
            break;
        default:
            toast(message || "Default!");
            break;
    }
}

export const Toastify = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={true}
            pauseOnHover={false}
        />
    )
}