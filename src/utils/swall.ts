import Swal from "sweetalert2";

export function toastSucces(message: string) {
  if (typeof window !== "undefined") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: message,
    });
  }
}

export function toastError(message: string) {
  if (typeof window !== "undefined") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "error",
      title: message,
    });
  }
}

export function swallUnauthorized(message: string) {
  if (typeof window !== "undefined") {
    Swal.fire({
      icon: "error",
      title: "Unauthorized",
      text: message,
      footer: "<p>PLEASE LOGIN FIRST</p>",
    });
  }
}
