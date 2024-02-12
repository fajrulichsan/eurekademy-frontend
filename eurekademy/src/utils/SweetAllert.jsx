import Swal from 'sweetalert2';

const SweetAllert = (icon, title, text, showConfirmButton) => {
    Swal.fire({
      icon,
      title,
      text,
      showConfirmButton,
      customClass: {
        container: 'fixed inset-0 flex items-center justify-center', // Full screen and center
        title: 'text-2xl font-semibold mb-4 text-blue-600', // Tailwind CSS styling
        text: 'text-gray-800', // Tailwind CSS styling
        popup: 'max-w-md mx-auto p-6 bg-white border rounded', // Adjust popup styles
      },
    });
  };
  
  
export default SweetAllert;
  