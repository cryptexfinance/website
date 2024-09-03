import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaInfoCircle } from "react-icons/fa";

type props = {
  id: string;
  msg: string | React.ReactElement;
  children: React.ReactElement | string;
  hideDelay?: number;
  showIcon?: boolean;
  iconOnLeft?: boolean;
  iconSize?: number;
  iconColor?: string;
  placement?: "auto" | "top" | "bottom" | "left" | "right";
  triggerByClick?: boolean;
}

export const CustomTooltip = ({
  id,
  msg,
  children,
  hideDelay = 200,
  showIcon = false,
  iconOnLeft = false,
  iconSize = 14,
  iconColor = "#e1e0ec",
  placement = "auto",
  triggerByClick = false,
}: props) => {
  return (
    <OverlayTrigger
      key={id}
      placement={placement}
      delay={{ show: 100, hide: hideDelay }}
      trigger={!triggerByClick ? ["hover", "focus"] : ["click"]}
      overlay={
        <Tooltip id={"tt-".concat(id)}>
          {msg}
        </Tooltip>
      }
    >
      <span className="overlay-child">
        {showIcon && iconOnLeft && <FaInfoCircle className="info-icon" size={iconSize} color={iconColor} />}
        {children}
        {showIcon && !iconOnLeft && <FaInfoCircle className="info-icon" size={iconSize} color={iconColor} />}
      </span>  
    </OverlayTrigger>      
  );  
};
