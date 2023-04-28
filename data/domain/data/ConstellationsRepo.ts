import { ConstellationModel } from '../model/constellationModel';

export class ConstellationBase { constructor(public index: number, public data: ConstellationModel) { } }



export const initConstellationsRepo = () => {
    return [    
        new ConstellationBase(0, <ConstellationModel>{
                "name": "A-1",
                "area": "Blunder Hills",
                "x": 908,
                "y": 21,
                "num1": 30,
                "num2": 99,
                "num3": 4,
                "starChartPoints": 3,
                "requirement": "Reach Lv 30 on four players @ Progress:{/}",
                "type": 1
            }),
        new ConstellationBase(1, <ConstellationModel>{
                "name": "A-2",
                "area": "Where the Branches End",
                "x": 827,
                "y": 343,
                "num1": 1,
                "num2": 99,
                "num3": 1,
                "starChartPoints": 3,
                "requirement": "AFK here for 1+ hours. @ Progress:{/}",
                "type": 3
            }),
        new ConstellationBase(2, <ConstellationModel>{
                "name": "A-3",
                "area": "Valley Of The Beans",
                "x": 575,
                "y": 1186,
                "num1": 0,
                "num2": 99,
                "num3": 4,
                "starChartPoints": 3,
                "requirement": "Reach this star on 4 players @ Progress:{/}",
                "type": 0
            }),
        new ConstellationBase(3, <ConstellationModel>{
                "name": "A-4",
                "area": "Tucked Away",
                "x": 387,
                "y": 835,
                "num1": 0,
                "num2": 99,
                "num3": 3,
                "starChartPoints": 4,
                "requirement": "Reach this star on 3 players @ Progress:{/}",
                "type": 0
            }),
        new ConstellationBase(4, <ConstellationModel>{
                "name": "A-5",
                "area": "The Office",
                "x": 296,
                "y": 446,
                "num1": 0,
                "num2": 99,
                "num3": 3,
                "starChartPoints": 5,
                "requirement": "Defeat Dr. Defecaus on 3 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(5, <ConstellationModel>{
                "name": "A-6",
                "area": "Freefall Caverns",
                "x": 653,
                "y": 236,
                "num1": 18,
                "num2": 30,
                "num3": 1,
                "starChartPoints": 3,
                "requirement": "Reach this star as any Archer Class @ Progress:{/}",
                "type": 0
            }),
        new ConstellationBase(6, <ConstellationModel>{
                "name": "A-7",
                "area": "Winding Willows",
                "x": 707,
                "y": 651,
                "num1": 12,
                "num2": 99,
                "num3": 2,
                "starChartPoints": 3,
                "requirement": "AFK here for 12+ hours on 2 players @ Progress:{/}",
                "type": 3
            }),
        new ConstellationBase(7, <ConstellationModel>{
                "name": "A-8",
                "area": "Dewdrop Colosseum",
                "x": 882,
                "y": 459,
                "num1": 0,
                "num2": 99,
                "num3": 3,
                "starChartPoints": 4,
                "requirement": "Clear the colosseum on 3 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(8, <ConstellationModel>{
                "name": "A-9",
                "area": "End Of The Road",
                "x": 1183,
                "y": 571,
                "num1": 20,
                "num2": 99,
                "num3": 3,
                "starChartPoints": 5,
                "requirement": "Defeat Amarok in under 20 seconds on 3 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(9, <ConstellationModel>{
                "name": "A-10",
                "area": "Echoing Egress",
                "x": 125,
                "y": 758,
                "num1": 31,
                "num2": 43,
                "num3": 1,
                "starChartPoints": 4,
                "requirement": "Reach this star as any Mage Class @ Progress:{/}",
                "type": 0
            }),
        new ConstellationBase(10, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(11, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(12, <ConstellationModel>{
                "name": "B-1",
                "area": "The Mimic Hole",
                "x": 16,
                "y": 876,
                "num1": 0,
                "num2": 99,
                "num3": 3,
                "starChartPoints": 4,
                "requirement": "Reach this star on 3 players @ Progress:{/}",
                "type": 0
            }),
        new ConstellationBase(13, <ConstellationModel>{
                "name": "B-2",
                "area": "Faraway Piers",
                "x": 490,
                "y": 367,
                "num1": 31,
                "num2": 43,
                "num3": 1,
                "starChartPoints": 4,
                "requirement": "Reach this star as any Mage Class @ Progress:{/}",
                "type": 0
            }),
        new ConstellationBase(14, <ConstellationModel>{
                "name": "B-3",
                "area": "The Grandioso Canyon",
                "x": 1011,
                "y": 432,
                "num1": 20,
                "num2": 99,
                "num3": 3,
                "starChartPoints": 4,
                "requirement": "AFK here for 20+ hours on 3 players @ Progress:{/}",
                "type": 3
            }),
        new ConstellationBase(15, <ConstellationModel>{
                "name": "B-4",
                "area": "Slamabam Straightaway",
                "x": 1790,
                "y": 443,
                "num1": 0,
                "num2": 99,
                "num3": 4,
                "starChartPoints": 5,
                "requirement": "Reach this star on 4 players @ Progress:{/}",
                "type": 0
            }),
        new ConstellationBase(16, <ConstellationModel>{
                "name": "B-5",
                "area": "Sandstone Colosseum",
                "x": 134,
                "y": 209,
                "num1": 0,
                "num2": 99,
                "num3": 4,
                "starChartPoints": 3,
                "requirement": "Clear the colosseum on 4 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(17, <ConstellationModel>{
                "name": "B-6",
                "area": "Efaunt's Tomb",
                "x": 210,
                "y": 443,
                "num1": 0,
                "num2": 99,
                "num3": 1,
                "starChartPoints": 5,
                "requirement": "Defeat Efaunt as any Beginner Class @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(18, <ConstellationModel>{
                "name": "B-7",
                "area": "Up Up Down Down",
                "x": 958,
                "y": 55,
                "num1": 30,
                "num2": 99,
                "num3": 3,
                "starChartPoints": 3,
                "requirement": "AFK here for 30+ hours on 3 players @ Progress:{/}",
                "type": 3
            }),
        new ConstellationBase(19, <ConstellationModel>{
                "name": "B-8",
                "area": "YumYum Grotto",
                "x": 11,
                "y": 451,
                "num1": 65,
                "num2": 99,
                "num3": 4,
                "starChartPoints": 4,
                "requirement": "Reach Lv 65 on four players @ Progress:{/}",
                "type": 1
            }),
        new ConstellationBase(20, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(21, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(22, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(23, <ConstellationModel>{
                "name": "C-1",
                "area": "Frostbite Towndra",
                "x": 13,
                "y": 244,
                "num1": 90,
                "num2": 99,
                "num3": 6,
                "starChartPoints": 6,
                "requirement": "Reach Lv 90 on 6 players @ Progress:{/}",
                "type": 1
            }),
        new ConstellationBase(24, <ConstellationModel>{
                "name": "C-2",
                "area": "Steep Sheep Ledge",
                "x": 898,
                "y": 698,
                "num1": 0,
                "num2": 99,
                "num3": 4,
                "starChartPoints": 4,
                "requirement": "Defeat a sheepie barehanded on four players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(25, <ConstellationModel>{
                "name": "C-3",
                "area": "Trappers Folley",
                "x": 183,
                "y": 368,
                "num1": 0,
                "num2": 99,
                "num3": 5,
                "starChartPoints": 4,
                "requirement": "Reach Lv 15 trapping on five players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(26, <ConstellationModel>{
                "name": "C-4",
                "area": "Refrigeration Station",
                "x": 78,
                "y": 450,
                "num1": 40,
                "num2": 99,
                "num3": 3,
                "starChartPoints": 4,
                "requirement": "AFK for 40+ hrs on 3 players @ Progress:{/}",
                "type": 3
            }),
        new ConstellationBase(27, <ConstellationModel>{
                "name": "C-5",
                "area": "Rollin' Tundra",
                "x": 1643,
                "y": 439,
                "num1": 11,
                "num2": 99,
                "num3": 4,
                "starChartPoints": 5,
                "requirement": "Reach wave 11 on 4 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(28, <ConstellationModel>{
                "name": "C-6",
                "area": "Thermonuclear Climb",
                "x": 843,
                "y": 1010,
                "num1": 11,
                "num2": 99,
                "num3": 9,
                "starChartPoints": 5,
                "requirement": "AFK for 11+ hrs on 9 players @ Progress:{/}",
                "type": 3
            }),
        new ConstellationBase(29, <ConstellationModel>{
                "name": "C-7",
                "area": "Crystal Basecamp",
                "x": 1488,
                "y": 283,
                "num1": 0,
                "num2": 99,
                "num3": 6,
                "starChartPoints": 6,
                "requirement": "Reach this star on 6 players @ Progress:{/}",
                "type": 0
            }),
        new ConstellationBase(30, <ConstellationModel>{
                "name": "C-8",
                "area": "Hell Hath Frozen Over",
                "x": 923,
                "y": 303,
                "num1": 0,
                "num2": 99,
                "num3": 4,
                "starChartPoints": 5,
                "requirement": "Kill a bloodbone on 4 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(31, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(32, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(33, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(34, <ConstellationModel>{
                "name": "D-1",
                "area": "Outer World Town",
                "x": 42,
                "y": 107,
                "num1": 120,
                "num2": 99,
                "num3": 8,
                "starChartPoints": 5,
                "requirement": "Reach Lv 120 on 8 players @ Progress:{/}",
                "type": 1
            }),
        new ConstellationBase(35, <ConstellationModel>{
                "name": "D-2",
                "area": "Spaceway Raceway",
                "x": 29,
                "y": 426,
                "num1": 0,
                "num2": 99,
                "num3": 3,
                "starChartPoints": 3,
                "requirement": "Defeat all mushrooms before any respawn on 3 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(36, <ConstellationModel>{
                "name": "D-3",
                "area": "Donut Drive-In",
                "x": 470,
                "y": 633,
                "num1": 0,
                "num2": 99,
                "num3": 4,
                "starChartPoints": 4,
                "requirement": "Reach Lv 15 Cooking on 4 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(37, <ConstellationModel>{
                "name": "D-4",
                "area": "Wurm Highway",
                "x": 335,
                "y": 606,
                "num1": 0,
                "num2": 99,
                "num3": 3,
                "starChartPoints": 4,
                "requirement": "Reach this star on 3 players @ Progress:{/}",
                "type": 0
            }),
        new ConstellationBase(38, <ConstellationModel>{
                "name": "D-5",
                "area": "Cocoa Tunnel",
                "x": 940,
                "y": 322,
                "num1": 0,
                "num2": 99,
                "num3": 4,
                "starChartPoints": 3,
                "requirement": "Defeat all choccies before any respawn on 4 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(39, <ConstellationModel>{
                "name": "D-6",
                "area": "Standstill Plains",
                "x": 1427,
                "y": 178,
                "num1": 0,
                "num2": 99,
                "num3": 4,
                "starChartPoints": 3,
                "requirement": "Reach this star on 4 players @ Progress:{/}",
                "type": 0
            }),
        new ConstellationBase(40, <ConstellationModel>{
                "name": "D-7",
                "area": "Shelled Shores",
                "x": 322,
                "y": 434,
                "num1": 0,
                "num2": 99,
                "num3": 4,
                "starChartPoints": 3,
                "requirement": "Hit a megacrit on a Clammy on 4 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(41, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(42, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(43, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(44, <ConstellationModel>{
                "name": "E-1",
                "area": "Magma Rivertown",
                "x": 1577,
                "y": 634,
                "num1": 200,
                "num2": 99,
                "num3": 10,
                "starChartPoints": 5,
                "requirement": "Reach Lv 200 on 10 players @ Progress:{/}",
                "type": 1
            }),
        new ConstellationBase(45, <ConstellationModel>{
                "name": "E-2",
                "area": "Niagrilled Falls",
                "x": 487,
                "y": 744,
                "num1": 0,
                "num2": 99,
                "num3": 6,
                "starChartPoints": 4,
                "requirement": "Defeat all maccies before any respawn on 6 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(46, <ConstellationModel>{
                "name": "E-3",
                "area": "Cracker Jack Lake",
                "x": 347,
                "y": 172,
                "num1": 0,
                "num2": 99,
                "num3": 10,
                "starChartPoints": 3,
                "requirement": "Reach this star on 10 players @ Progress:{/}",
                "type": 0
            }),
        new ConstellationBase(47, <ConstellationModel>{
                "name": "E-4",
                "area": "Erruption River",
                "x": 1000,
                "y": 350,
                "num1": 0,
                "num2": 99,
                "num3": 3,
                "starChartPoints": 4,
                "requirement": "Successfully gather dandielogs on 3 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(48, <ConstellationModel>{
                "name": "E-5",
                "area": "OJ Bay",
                "x": 900,
                "y": 250,
                "num1": 0,
                "num2": 99,
                "num3": 7,
                "starChartPoints": 5,
                "requirement": "Defeat all citringes before any respawn on 7 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(49, <ConstellationModel>{
                "name": "E-6",
                "area": "Miner Mole Outskirts",
                "x": 165,
                "y": 806,
                "num1": 0,
                "num2": 99,
                "num3": 10,
                "starChartPoints": 5,
                "requirement": "Reach this star on 10 players @ Progress:{/}",
                "type": 0
            }),
        new ConstellationBase(50, <ConstellationModel>{
                "name": "E-7",
                "area": "The Worm Nest",
                "x": 512,
                "y": 887,
                "num1": 0,
                "num2": 99,
                "num3": 5,
                "starChartPoints": 8,
                "requirement": "Defeat 100 Wurms in under 100 sec from entering on 5 players @ Progress:{/}",
                "type": 4
            }),
        new ConstellationBase(51, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(52, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            }),
        new ConstellationBase(53, <ConstellationModel>{
                "name": "Filler",
                "area": "",
                "x": 0,
                "y": 0,
                "num1": 0,
                "num2": 0,
                "num3": 0,
                "starChartPoints": 0,
                "requirement": "",
                "type": 0
            })    
]
}
