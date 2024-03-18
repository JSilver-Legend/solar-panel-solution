import { type1, type21, type22, type23, type24, type31, type32, type33, type34, type41, type42, type43, type44 } from "utils/ImageInfo";

export const MAP_DRAWING_MODE_UNDEFINED = '';
export const MAP_DRAWING_MODE_POLYGON = 'polygon';

export const PERSIST_KEY = "root20230315-state";

export const hindranceChoices = [
  { name: "Välj alternativ", value: "0" },
  { name: "Skorsten", value: "1" },
  { name: "fönster", value: "2" },
];

export const roofTypeChoices = [
  { name: "Välj alternativ", value: "0" },
  { name: "Plåt", value: "1" },
  { name: "Tegelpannor", value: "2" },
  { name: "Betongpannor", value: "3" },
  { name: "Papp", value: "4" },
  { name: "Eternit", value: "5" },
  { name: "Annat material", value: "6" }
];

export const buildingTypeChoices = [
  { name: "Välj alternativ", value: "0"},
  { name: "Type - 1", value: "1", src: type1 },
  { name: "Type - 2 - 1", value: "2-1", src: type21 },
  { name: "Type - 2 - 2", value: "2-2", src: type22 },
  { name: "Type - 2 - 3", value: "2-3", src: type23 },
  { name: "Type - 2 - 4", value: "2-4", src: type24 },
  { name: "Type - 3 - 1", value: "3-1", src: type31 },
  { name: "Type - 3 - 2", value: "3-2", src: type32 },
  { name: "Type - 3 - 3", value: "3-3", src: type33 },
  { name: "Type - 3 - 4", value: "3-4", src: type34 },
  { name: "Type - 4 - 1", value: "4-1", src: type41 },
  { name: "Type - 4 - 2", value: "4-2", src: type42 },
  { name: "Type - 4 - 3", value: "4-3", src: type43 },
  { name: "Type - 4 - 4", value: "4-4", src: type44 },
];

export const obstacleTypeChoices = [
  { name: "Välj alternativ", value: "0" },
  { name: "Skorsten", value: "1" },
  { name: "Fönster", value: "2" },
];