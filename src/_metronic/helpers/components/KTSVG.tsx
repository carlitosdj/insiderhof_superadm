import { FC } from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../AssetHelpers";
type Props = {
  className?: string;
  path: string;
  svgClassName?: string;
  fill?: string;
  stroke?: string;
};

export const KTSVG: FC<Props> = ({
  className = "",
  path,
  svgClassName = "mh-50px",
  fill = "current",
  stroke = "current",
}) => {
  return (
    <span className={`svg-icon ${className}`}>
      <SVG
        src={toAbsoluteUrl(path)}
        className={svgClassName}
        fill={fill}
        stroke={stroke}
      />
    </span>
  );
};
