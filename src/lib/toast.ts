// eslint-disable-next-line import/no-named-as-default
import toast, { type ToastOptions, type ToastType } from "react-hot-toast";

type Message = Parameters<typeof toast>[0];

export function errorToast(msg: Message) {
  return toast.error(msg, {
    position: "top-right",
    className: "text-white bg-danger",
  });
}

export function successToast(msg: Message) {
  return toast.success(msg, {
    position: "top-right",
    className: "text-white bg-success",
  });
}
