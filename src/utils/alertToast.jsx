
import Swal from 'sweetalert2';

export const alertToast = (text = '', title = '', icon = 'info') => {
  Swal.fire({
    title,
    text,
    icon,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};
