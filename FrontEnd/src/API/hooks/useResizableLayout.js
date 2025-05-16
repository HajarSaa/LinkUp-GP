/**
 * A custom React hook for managing a resizable layout with a sidebar and panel (Desktop only).
 * @param {number} initialSidebar - Initial width of the sidebar (default: 300).
 * @param {number} initialPanel - Initial width of the panel (default: 250).
 * @param {boolean} isResizable - Whether the layout is resizable (default: true).
 * @returns {object} An object containing sidebarWidth, panelWidth, containerRef, handleResizeStart, setSidebarWidth, and setPanelWidth.
 */
import { useRef, useState, useEffect, useCallback } from "react";

export default function useResizableLayout(
  initialSidebar = 300,
  initialPanel = 250,
  isResizable = true
) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const savedWidth = localStorage.getItem("sidebarWidth");
    return savedWidth && !isNaN(parseInt(savedWidth))
      ? parseInt(savedWidth)
      : initialSidebar;
  });

  const [panelWidth, setPanelWidth] = useState(() => {
    const savedWidth = localStorage.getItem("panelWidth");
    return savedWidth && !isNaN(parseInt(savedWidth))
      ? parseInt(savedWidth)
      : initialPanel;
  });

  const containerRef = useRef(null);
  const resizing = useRef(null);
  const startX = useRef(0);
  const initialSidebarWidth = useRef(0);
  const initialPanelWidth = useRef(0);
  const animationFrame = useRef(null);

  const MIN_SIDEBAR_WIDTH = 180;
  const MIN_PANEL_WIDTH = 200;
  const MIN_CONTENT_WIDTH = 300;
  const MAX_SIDEBAR_WIDTH = 600; // Optional max width
  const MAX_PANEL_WIDTH = 600; // Optional max width

  const handleMouseMove = useCallback(
    (e) => {
      if (!resizing.current || !isResizable) return;
      if (!containerRef.current) return;

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      animationFrame.current = requestAnimationFrame(() => {
        const deltaX = e.clientX - startX.current;
        const containerWidth = containerRef.current.offsetWidth;

        if (resizing.current === "sidebar") {
          const newWidth = Math.max(
            MIN_SIDEBAR_WIDTH,
            Math.min(
              initialSidebarWidth.current + deltaX,
              Math.min(
                containerWidth - panelWidth - MIN_CONTENT_WIDTH,
                MAX_SIDEBAR_WIDTH
              )
            )
          );
          setSidebarWidth(newWidth);
          localStorage.setItem("sidebarWidth", newWidth);
        } else if (resizing.current === "panel") {
          const newWidth = Math.max(
            MIN_PANEL_WIDTH,
            Math.min(
              initialPanelWidth.current - deltaX,
              Math.min(
                containerWidth - sidebarWidth - MIN_CONTENT_WIDTH,
                MAX_PANEL_WIDTH
              )
            )
          );
          setPanelWidth(newWidth);
          localStorage.setItem("panelWidth", newWidth);
        }
      });
    },
    [isResizable, panelWidth, sidebarWidth]
  );

  const handleMouseUp = useCallback(() => {
    resizing.current = null;
    document.body.style.cursor = "default";

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
  }, []);

  const handleResizeStart = useCallback(
    (e, section) => {
      if (!isResizable) return;

      resizing.current = section;
      startX.current = e.clientX;
      initialSidebarWidth.current = sidebarWidth;
      initialPanelWidth.current = panelWidth;
      document.body.style.cursor = "col-resize";
      e.preventDefault();
    },
    [isResizable, sidebarWidth, panelWidth]
  );

  const handleWindowResize = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const requiredWidth = sidebarWidth + MIN_CONTENT_WIDTH + panelWidth;

    if (containerWidth < requiredWidth) {
      const excess = requiredWidth - containerWidth;
      let newSidebarWidth = sidebarWidth;
      let newPanelWidth = panelWidth;

      if (sidebarWidth > MIN_SIDEBAR_WIDTH && panelWidth > MIN_PANEL_WIDTH) {
        const totalExtra =
          sidebarWidth - MIN_SIDEBAR_WIDTH + (panelWidth - MIN_PANEL_WIDTH);
        const sidebarShare = (sidebarWidth - MIN_SIDEBAR_WIDTH) / totalExtra;
        newSidebarWidth = Math.max(
          MIN_SIDEBAR_WIDTH,
          sidebarWidth - excess * sidebarShare
        );
        newPanelWidth = Math.max(
          MIN_PANEL_WIDTH,
          panelWidth - excess * (1 - sidebarShare)
        );
      } else if (sidebarWidth > MIN_SIDEBAR_WIDTH) {
        newSidebarWidth = Math.max(MIN_SIDEBAR_WIDTH, sidebarWidth - excess);
      } else if (panelWidth > MIN_PANEL_WIDTH) {
        newPanelWidth = Math.max(MIN_PANEL_WIDTH, panelWidth - excess);
      }

      if (newSidebarWidth !== sidebarWidth) {
        setSidebarWidth(Math.round(newSidebarWidth));
        localStorage.setItem("sidebarWidth", Math.round(newSidebarWidth));
      }
      if (newPanelWidth !== panelWidth) {
        setPanelWidth(Math.round(newPanelWidth));
        localStorage.setItem("panelWidth", Math.round(newPanelWidth));
      }
    }
  }, [sidebarWidth, panelWidth]);

  useEffect(() => {
    if (!isResizable) {
      // لا نغير الـ widths، بس نمنع الـ event listeners من الشغل
      return;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleWindowResize);

    // Initial resize check
    handleWindowResize();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleWindowResize);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [
    isResizable,
    handleMouseMove,
    handleMouseUp,
    handleWindowResize,
    sidebarWidth,
    panelWidth,
  ]);

  return {
    sidebarWidth,
    panelWidth,
    containerRef,
    handleResizeStart,
    setSidebarWidth,
    setPanelWidth,
  };
}
