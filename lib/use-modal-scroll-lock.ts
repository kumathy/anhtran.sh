import { type RefObject, useEffect } from "react";

export function useModalScrollLock(ref: RefObject<HTMLDialogElement | null>) {
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    function onTouchMove(event: TouchEvent) {
      if (!dialog) return;

      const scrollable = dialog.scrollHeight > dialog.clientHeight;
      if (event.target === dialog || !scrollable) event.preventDefault();
    }

    dialog.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => dialog.removeEventListener("touchmove", onTouchMove);
  }, [ref]);
}
