import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { grey } from "@mui/material/colors";

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    "&:before": {
      border: "1px solid #E6E8ED",
      color: theme.palette.common.white,
    },
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: grey["800"],
    boxShadow: theme.shadows[8],
    fontSize: 14,
    border: "1px solid #E6E8ED",
    padding: 8,
  },
}));
