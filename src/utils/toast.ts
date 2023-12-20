import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastMessage = (message:string) => {
    toast.success(message)
}