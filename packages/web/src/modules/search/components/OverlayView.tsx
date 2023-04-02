import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { createOverlay } from "./Overlay";

type OverlayProps = PropsWithChildren<{
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  pane?: keyof google.maps.MapPanes;
  map: google.maps.Map;
  zIndex?: number;
}>;

export default function OverlayView({
  position,
  pane = "floatPane",
  map,
  zIndex,
  children,
}: OverlayProps) {
  const [isHovering, setIsHovering] = useState(false);
  const container = useMemo(() => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.onmouseover = () => setIsHovering(true);
    div.onmouseleave = () => setIsHovering(false);

    return div;
  }, []);

  const overlay = useMemo(() => {
    if (!window.google) return;
    return createOverlay(container, pane, position);
  }, [container, pane, position]);

  useEffect(() => {
    overlay?.setMap(map);
    return () => overlay?.setMap(null);
  }, [map, overlay]);

  // to move the container to the foreground and background
  useEffect(() => {
    container.style.zIndex = `${isHovering ? 99 : zIndex}`;
  }, [zIndex, container, isHovering]);

  return createPortal(children, container);
}
