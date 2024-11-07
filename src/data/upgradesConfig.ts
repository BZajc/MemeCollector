export interface Upgrade {
  id: string;
  name: string;
  price: number;
  type: "click power" | "double click" | "critical click chance" | "critical click power" | "special";
  value?: number;
  description?: string;
}

export const upgrades: Upgrade[] = [
  // Click
  {
    id: "clickpower1",
    name: "Click Power I",
    price: 30,
    type: "click power",
    value: 2.6,
  },
  {
    id: "clickpower2",
    name: "Click Power II",
    price: 90,
    type: "click power",
    value: 4.6,
  },
  {
    id: "clickpower3",
    name: "Click Power III",
    price: 270,
    type: "click power",
    value: 8.4,
  },
  {
    id: "clickpower4",
    name: "Click Power IV",
    price: 810,
    type: "click power",
    value: 15.1,
  },
  {
    id: "clickpower5",
    name: "Click Power V",
    price: 2430,
    type: "click power",
    value: 27.3,
  },
  {
    id: "clickpower6",
    name: "Click Power VI",
    price: 7290,
    type: "click power",
    value: 49.1,
  },
  {
    id: "clickpower7",
    name: "Click Power VII",
    price: 21870,
    type: "click power",
    value: 88.4,
  },
  {
    id: "clickpower8",
    name: "Click Power VIII",
    price: 65610,
    type: "click power",
    value: 159.1,
  },
  {
    id: "clickpower9",
    name: "Click Power IX",
    price: 196830,
    type: "click power",
    value: 286.5,
  },
  {
    id: "clickpower10",
    name: "Click Power X",
    price: 590490,
    type: "click power",
    value: 515.7,
  },
  {
    id: "clickpower11",
    name: "Click Power XI",
    price: 1771470,
    type: "click power",
    value: 928.3,
  },
  {
    id: "clickpower12",
    name: "Click Power XII",
    price: 5314410,
    type: "click power",
    value: 1672,
  },
  // Double Click
  {
    id: "doubleclick1",
    name: "Double Click I",
    price: 200,
    type: "double click",
    value: 10, // percent value
  },
  {
    id: "doubleclick2",
    name: "Double Click II",
    price: 1800,
    type: "double click",
    value: 20,
  },
  {
    id: "doubleclick3",
    name: "Double Click III",
    price: 16200,
    type: "double click",
    value: 40,
  },
  {
    id: "doubleclick4",
    name: "Double Click IV",
    price: 145800,
    type: "double click",
    value: 70,
  },
  {
    id: "doubleclick5",
    name: "Double Click V",
    price: 1312200,
    type: "double click",
    value: 100,
  },
  // Critical click
  {
    id: "ccc1",
    name: "Critical Click Chance I",
    price: 100,
    type: "critical click chance",
    value: 1,
  },
  {
    id: "ccc2",
    name: "Critical Click Chance II",
    price: 250,
    type: "critical click chance",
    value: 3,
  },
  {
    id: "ccc3",
    name: "Critical Click Chance III",
    price: 625,
    type: "critical click chance",
    value: 8,
  },
  {
    id: "ccc4",
    name: "Critical Click Chance IV",
    price: 1562,
    type: "critical click chance",
    value: 15,
  },
  {
    id: "ccc5",
    name: "Critical Click Chance V",
    price: 3906,
    type: "critical click chance",
    value: 22,
  },
  {
    id: "ccc6",
    name: "Critical Click Chance VI",
    price: 9765,
    type: "critical click chance",
    value: 30,
  },
  {
    id: "ccc7",
    name: "Critical Click Chance VII",
    price: 24414,
    type: "critical click chance",
    value: 42,
  },
  {
    id: "ccc8",
    name: "Critical Click Chance VIII",
    price: 61035,
    type: "critical click chance",
    value: 56,
  },
  {
    id: "ccc9",
    name: "Critical Click Chance IX",
    price: 152587,
    type: "critical click chance",
    value: 68,
  },
  {
    id: "ccc10",
    name: "Critical Click Chance X",
    price: 381469,
    type: "critical click chance",
    value: 80,
  },
  {
    id: "ccc11",
    name: "Critical Click Chance XI",
    price: 953674,
    type: "critical click chance",
    value: 92,
  },
  {
    id: "ccc12",
    name: "Critical Click Chance XII",
    price: 2384185,
    type: "critical click chance",
    value: 100,
  },
  // Critical Click Power
  {
    id: "ccp1",
    name: "Critical Click Power I",
    price: 200,
    type: "critical click power",
    value: 2.0,
},
{
    id: "ccp2",
    name: "Critical Click Power II",
    price: 560,
    type: "critical click power",
    value: 2.5,
},
{
    id: "ccp3",
    name: "Critical Click Power III",
    price: 1568,
    type: "critical click power",
    value: 3.0,
},
{
    id: "ccp4",
    name: "Critical Click Power IV",
    price: 4390,
    type: "critical click power",
    value: 3.5,
},
{
    id: "ccp5",
    name: "Critical Click Power V",
    price: 12292,
    type: "critical click power",
    value: 4.0,
},
{
    id: "ccp6",
    name: "Critical Click Power VI",
    price: 34417,
    type: "critical click power",
    value: 4.5,
},
{
    id: "ccp7",
    name: "Critical Click Power VII",
    price: 96368,
    type: "critical click power",
    value: 5.0,
},
{
    id: "ccp8",
    name: "Critical Click Power VIII",
    price: 269830,
    type: "critical click power",
    value: 5.5,
},
{
    id: "ccp9",
    name: "Critical Click Power IX",
    price: 755524,
    type: "critical click power",
    value: 6.0,
},
{
    id: "ccp10",
    name: "Critical Click Power X",
    price: 2115467,
    type: "critical click power",
    value: 6.5,
},
{
    id: "ccp11",
    name: "Critical Click Power XI",
    price: 5923308,
    type: "critical click power",
    value: 7.0,
},
{
    id: "ccp12",
    name: "Critical Click Power XII",
    price: 16585263,
    type: "critical click power",
    value: 7.5,
},
  // Special
  {
    id: "specialbubbles1",
    name: "Bubbles",
    price: 2500,
    type: "special",
    value: 1,
  },
  {
    id: "specialwof1",
    name: "Wheel Of Meme",
    price: 30000,
    type: "special",
    value: 1,
  },
  {
    id: "specialblackjack1",
    name: "Black Jack",
    price: 1800000,
    type: "special",
    value: 1,
  },
];
