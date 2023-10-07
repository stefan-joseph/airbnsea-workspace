export default function capitalizeFirstLetter(str: string | undefined) {
  if (!str) return "";
  str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  if (str === "Linkedin") return "LinkedIn";
  return str;
}
