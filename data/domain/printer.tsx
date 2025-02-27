import { lavaLog, range } from "../utility";
import { Domain, RawData } from "./base/domain";
import { Divinity } from "./divinity";
import { GemStore } from "./gemPurchases";
import { Item } from "./items";
import { Lab } from "./lab";
import { Player } from "./player";
import { Rift, SkillMastery } from "./rift";
import { Sailing } from "./sailing";
import { ClassIndex } from "./talents";

export class Sample {
    inLab: boolean = false;
    harriep: boolean = false;
    artifactBoost: number = 0;
    divineKnightBoost: number = 0;
    skillMasteryBoost: number = 0;
    // Number of slots printing this sample.
    printing: number = 0;

    printingQuantity: number = 0;

    constructor(public item: string, public quantity: number) { }

    getSampleQuantity = (base: boolean = true) => {
        // If we want base amount, or if the sample isn't actively printing. Just return the raw sample number.
        if (base || !this.printing) {
            return this.quantity;
        }

        // Else do math to figure out the boost from lab / harriep.
        let baseQuantity = this.printingQuantity;
        baseQuantity *= this.inLab ? 2 : 1;
        baseQuantity *= this.harriep ? 3 : 1;
        return baseQuantity * (1 + (this.artifactBoost + this.divineKnightBoost) / 100) * (1 + this.skillMasteryBoost / 100);
    }

    isOutdatedPrint = () => {
        return this.printingQuantity < this.quantity;
    }
}

export class PlayerInfo {
    constructor(public samples: Sample[]) { }
}

export class Printer extends Domain {
    // 2d array of players and their 5 samples.
    samples: Sample[][] = [];
    bestDivineKnightPlayerId: number = -1;
    divineKnightOrbKills: number = 0;

    slotsUnlocked: number = 4;

    GetTotalActive = (itemName: string): number => {
        return this.samples.flatMap(sample => sample)
            .filter(sample => sample.item == itemName && sample.printing)
            .reduce((total, sample) => total += sample.getSampleQuantity(false) * sample.printing, 0);
    }

    getRawKeys(): RawData[] {
        return [
            {key: "Print", perPlayer: false, default: []},
            {key: "PrinterXtra", perPlayer: false, default: []},
        ]
    }

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const printer = data.get(this.getDataKey()) as Printer;
        const charCount = data.get("charCount") as number;

        const printerData = data.get("Print") as any[];
        const extraPrinterData = data.get("PrinterXtra") as any[];

        // Some printer data has no "persistence", so we reset the previous data.
        printer.samples = [];

        if (printerData) {
            range(0, charCount).forEach((_, playerIndex) => {
                const samples: Sample[] = [];

                // First 5 sample slots
                range(0, 5).forEach(sampleIndex => {
                    const arrayIndex = 5 + (sampleIndex * 2) + (playerIndex * 14);
                    samples.push(new Sample(printerData[arrayIndex], printerData[arrayIndex + 1]));
                });

                // Second set of 5 sample slots
                range(0, 5).forEach(sampleIndex => {
                    const arrayIndex = (sampleIndex * 2) + (playerIndex * 10);
                    samples.push(new Sample(extraPrinterData[arrayIndex], extraPrinterData[arrayIndex + 1]));
                });

                // Active printing slots
                range(0, 2).forEach(activeIndex => {
                    const printingItem = printerData[5 + 10 + (activeIndex * 2) + (playerIndex * 14)];
                    // If there's no printing item, exit early.
                    if (printingItem == "Blank") {
                        return;
                    }

                    const matchingSample = samples.find(sample => sample.item == printingItem);
                    // Old print, without an active sample.
                    const printingQuantity = printerData[6 + 10 + (activeIndex * 2) + (playerIndex * 14)]

                    // If we have an old print, without an active sample.
                    if (!matchingSample) {
                        const newSample = new Sample(printingItem, 0);
                        newSample.printingQuantity = printingQuantity;
                        newSample.printing += 1;
                        samples.push(newSample);
                    }
                    else {
                        matchingSample.printingQuantity = printingQuantity;
                        matchingSample.printing += 1;
                    }
                })

                printer.samples[playerIndex] = samples;
            })
        }
    }
}

export const updatePrinter = (data: Map<string, any>) => {
    const printer = data.get("printer") as Printer;
    const lab = data.get("lab") as Lab;
    const divinity = data.get("divinity") as Divinity;
    const sailing = data.get("sailing") as Sailing;
    const players = data.get("players") as Player[];
    const gemStore = data.get("gems") as GemStore;
    const rift = data.get("rift") as Rift;
    const optLacc = data.get("OptLacc");


    const skillMastery = rift.bonuses.find(bonus => bonus.name == "Skill Mastery") as SkillMastery;

    // if double printer
    if (lab.bonuses[1].active) {
        lab.playersInTubes.forEach(player => {
            printer.samples[player.playerID].forEach(sample => sample.inLab = true);
        })
    }

    divinity.gods[3].linkedPlayers.forEach(linkedPlayer => {
        printer.samples[linkedPlayer.playerID].forEach(sample => sample.harriep = true);
    })

    const daysSinceLastPrint = optLacc[125];
    printer.samples.flatMap(player => player).forEach(sample => {
        sample.artifactBoost = sailing.artifacts[4].getBonus() * daysSinceLastPrint
        sample.skillMasteryBoost = skillMastery.getTotalBonusByIndex(5);
    });

    const bestDivineKnight = players.filter(player => player.classId == ClassIndex.Divine_Knight).sort((player1, player2) => player1.getTalentBonus(178) > player2.getTalentBonus(178) ? 1 : -1).pop()

    if (bestDivineKnight) {
        const divineKnightOrbKills = optLacc[138];
        printer.divineKnightOrbKills = divineKnightOrbKills;
        printer.bestDivineKnightPlayerId = bestDivineKnight.playerID;
        printer.samples.flatMap(player => player).forEach(sample => {
            sample.divineKnightBoost = bestDivineKnight.getTalentBonus(178) * lavaLog(divineKnightOrbKills);
        });
    }

    printer.slotsUnlocked = 4 + (gemStore.purchases.find(purchase => purchase.no == 112)?.pucrhased ?? 0);

    return printer;
}