// import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
// import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
// import CountertopsOutlinedIcon from "@mui/icons-material/CountertopsOutlined";
// import TvRoundedIcon from "@mui/icons-material/TvRounded";
// import OutdoorGrillOutlinedIcon from "@mui/icons-material/OutdoorGrillOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  GiBarbecue,
  GiKitchenTap,
  GiThermometerCold,
  GiTv,
} from "react-icons/gi";
import { IoWifiOutline } from "react-icons/io5";
export const getAmenitiesIcon = (amenity: string) => {
  switch (amenity.toLowerCase()) {
    case "wifi":
      return <IoWifiOutline fontSize="inherit" />;
    case "air conditioning":
      return <GiThermometerCold fontSize="inherit" />;
    case "kitchen":
      return <GiKitchenTap fontSize="inherit" />;
    case "tv":
      return <GiTv fontSize="inherit" />;
    case "bbq grill":
      return <GiBarbecue fontSize="inherit" />;
    default:
      return <AddRoundedIcon fontSize="inherit" />;
  }
};
