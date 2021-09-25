import { COLORS } from "./colors";

/** 
export const TAGS = [
  { name: "announcement", color: COLORS.PRIMARY_PINK },
  { name: "bankless", color: "#93FCFF" },
  { name: "blog", color: COLORS.PRIMARY_BLUE },
  { name: "block", color: COLORS.AQUA }, 
  { name: "chainlink", color: COLORS.CYAN }, 
  { name: "chainlink youtube", color: COLORS.CYAN }, 
  { name: "cryptex", color: COLORS.PRIMARY_PURPLE }, 
  { name: "cryptex finance", color: COLORS.PRIMARY_PURPLE }, 
  { name: "ctx", color: COLORS.PURPLE_DARKEST }, 
  { name: "decrypt", color:  "#01FFF0" }, 
  { name: "defi", color: "#FFDEF3" }, 
  { name: "defi rate", color:  "#FFDEF3" }, 
  { name: "defi times", color: COLORS.RED_DARK }, 
  { name: "defiant", color: COLORS.ORANGE_DARK },
  { name: "index", color: "#3CB9FC" },
  { name: "learn",  color: COLORS.SHADOW_BLUE_NEON }, 
  { name: "podcast", color: "#D9EB4B"}, 
  { name: "rate", color: COLORS.PURPLE_DARK }, 
  { name: "tcap",  color: COLORS.PRIMARY_ORANGE }, 
  { name: "tcap index", color: COLORS.PRIMARY_ORANGE }, 
  { name: "the block", color: COLORS.BLUE_LIGHT }, 
  { name: "the defiant", color: COLORS.GREEN_LIGHT }, 
  { name: "youtube", color: COLORS.RED }, 
  { name: "zapper", color: COLORS.GREY }, 
  { name: "zapper learn", color: COLORS.GREY }, 
];
*/
export const OPTIONAL_COLORS = [
  "#FF9472",
  COLORS.GREEN,
  "#EBF875",
  "#7898FB",
  "#E1EF7E",
  "#fc74fd",
  "#cfff04",
  "#fe4164",
  "#04d9ff",
  "#ccff02",
  "#c32148",
  "#cc9900",
  "#c1f80a",
  "#372d52",
];


export function tagColor(tagsAndColors, postTag) {
  const indexOfTag = tagsAndColors.findIndex(item => item.name === postTag.toLowerCase());
  if (indexOfTag !== -1) {
    return tagsAndColors[indexOfTag].color;
  }
  
  const index = Math.floor(Math.random() * (OPTIONAL_COLORS.length));
  if (index < OPTIONAL_COLORS.length)
    return OPTIONAL_COLORS[index];
  else
    return COLORS.SHADOW_PURPLE_NEON_SECONDARY;
}