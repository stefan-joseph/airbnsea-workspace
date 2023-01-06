import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import CountertopsOutlinedIcon from "@mui/icons-material/CountertopsOutlined";
import TvRoundedIcon from "@mui/icons-material/TvRounded";
import OutdoorGrillOutlinedIcon from "@mui/icons-material/OutdoorGrillOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
export const getAmenitiesIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case "wifi":
      return <WifiRoundedIcon fontSize="inherit" />;
    case "air conditioning":
      return <AcUnitRoundedIcon fontSize="inherit" />;
    case "kitchen":
      return <CountertopsOutlinedIcon fontSize="inherit" />;
    case "tv":
      return <TvRoundedIcon fontSize="inherit" />;
    case "bbq grill":
      return <OutdoorGrillOutlinedIcon fontSize="inherit" />;
    default:
      return <AddRoundedIcon fontSize="inherit" />;
  }
};
