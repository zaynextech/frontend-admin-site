import Swal from "sweetalert2";

type Props = {
  title: string;
  text?: string;
  confirmText?: string;
};

/**
 * ConfirmModal: A high-end, themed confirmation dialog.
 * Designed to match the Zaynex Enterprise Workspace aesthetic.
 */
const ConfirmModal = async ({
  title,
  text,
  confirmText = "Proceed", // Slightly more professional default
}: Props) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    iconColor: "#06b6d4", // Sync with your cyan primary color
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: "Cancel",
    
    // Theming & Glassmorphism
    background: "#080808",
    color: "#ffffff",
    
    // Button Styling
    confirmButtonColor: "#06b6d4",
    cancelButtonColor: "#18181b", // zinc-900
    
    // Advanced UI Refinement
    customClass: {
      popup: "rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-xl",
      title: "text-2xl font-bold tracking-tight text-white",
      htmlContainer: "text-zinc-400 font-light leading-relaxed",
      confirmButton: "px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-transform active:scale-95",
      cancelButton: "px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs border border-white/5 transition-transform active:scale-95",
      actions: "gap-4",
    },
    // Ensure styles are applied via Tailwind
    buttonsStyling: true, 
  });

  return result.isConfirmed;
};

export default ConfirmModal;