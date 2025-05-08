import { useRef, useState, useEffect, useCallback } from "react";

export default function useResizableLayout(
  initialSidebar = 300,
  initialPanel = 250,
  isResizable = true
) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    return parseInt(localStorage.getItem("sidebarWidth")) || initialSidebar;
  });

  const [panelWidth, setPanelWidth] = useState(() => {
    return parseInt(localStorage.getItem("panelWidth")) || initialPanel;
  });

  const containerRef = useRef(null);
  const resizing = useRef(null);
  const startX = useRef(0);
  const initialSidebarWidth = useRef(0);
  const initialPanelWidth = useRef(0);
  const animationFrame = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!resizing.current || !isResizable) return;

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      const deltaX = e.clientX - startX.current;
      const containerWidth = containerRef.current?.offsetWidth || 0;

      if (resizing.current === "sidebar") {
        const newWidth = Math.max(
          180,
          Math.min(
            initialSidebarWidth.current + deltaX,
            containerWidth - panelWidth - 300
          )
        );
        setSidebarWidth(newWidth);
        localStorage.setItem("sidebarWidth", newWidth);
      } else if (resizing.current === "panel") {
        const newWidth = Math.max(
          200,
          Math.min(
            initialPanelWidth.current - deltaX,
            containerWidth - sidebarWidth - 300
          )
        );
        setPanelWidth(newWidth);
        localStorage.setItem("panelWidth", newWidth);
      }
    });
  }, [isResizable, panelWidth, sidebarWidth]);

  const handleMouseUp = () => {
    resizing.current = null;
    document.body.style.cursor = "default";

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
  };

  const handleResizeStart = (e, section) => {
    if (!isResizable) return;

    resizing.current = section;
    startX.current = e.clientX;
    initialSidebarWidth.current = sidebarWidth;
    initialPanelWidth.current = panelWidth;
    document.body.style.cursor = "col-resize";
    e.preventDefault();
  };

  useEffect(() => {
    if (!isResizable) {
      setSidebarWidth(initialSidebar);
      setPanelWidth(initialPanel);
      return;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isResizable, handleMouseMove, initialPanel, initialSidebar]);

  return {
    sidebarWidth,
    panelWidth,
    containerRef,
    handleResizeStart,
    setSidebarWidth,
    setPanelWidth,
  };
}
