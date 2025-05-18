import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function useResize(ref, initialWidth) {
  const [width, setWidth] = useState(initialWidth);
  const isResizing = useSelector((state) => state.resizing.isResizable);
  const resizeRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!resizeRef.current || !ref.current || !isResizing) return;

      const wrapperRect = ref.current.parentElement.getBoundingClientRect();
      const newWidth = e.clientX - wrapperRect.left;


      const minPageContentWidth = 500;
      const maxSidebarWidth = wrapperRect.width - minPageContentWidth;

      if (newWidth >= 180 && newWidth <= Math.min(300, maxSidebarWidth)) {
        ref.current.style.width = `${newWidth}px`;
      }
    };

    const handleMouseUp = () => {
      if (resizeRef.current) {
        const newWidth = parseInt(ref.current.style.width) || width;
        setWidth(newWidth);
        localStorage.setItem("sidebarWidth", newWidth);
        resizeRef.current = false;
      }
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [width, isResizing, ref]);

  const startResizing = (e) => {
    e.preventDefault(); // منع الـ text selection
    if (isResizing) {
      resizeRef.current = true;
    }
  };

  return { width, startResizing };
}

export default useResize;
