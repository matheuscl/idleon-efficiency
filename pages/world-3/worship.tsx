import {
    Box,
    Grid,
    Heading,
    Meter,
    ResponsiveContext,
    Stack,
    Text,
    TextInput,
} from 'grommet'
import { useEffect, useContext, useState, useMemo } from 'react';
import { AppContext } from '../../data/appContext'
import { NextSeo } from 'next-seo';

import TabButton from '../../components/base/TabButton';
import { Player } from '../../data/domain/player';
import { SkillsIndex } from "../../data/domain/SkillsIndex";
import ShadowBox from '../../components/base/ShadowBox';
import { TimeDisplaySize, TimeDown } from '../../components/base/TimeDisplay';
import TextAndLabel, { ComponentAndLabel } from '../../components/base/TextAndLabel';
import { Worship as WorshipDomain } from '../../data/domain/worship';
import { Prayer } from '../../data/domain/prayers';
import { GroupBy, GroupByFunction, nFormatter } from '../../data/utility';
import IconImage from '../../components/base/IconImage';
import { PrayerBase } from '../../data/domain/data/PrayerRepo';
import { connectFirestoreEmulator } from 'firebase/firestore';

function ChargeDisplay() {
    const appContext = useContext(AppContext);

    const theData = appContext.data.getData();
    const playerData = theData.get("players") as Player[];
    const worship = theData.get("worship") as WorshipDomain;

    return (
        <Box gap="medium" align="center">
            {worship.bestWizardPlayerID > -1 &&
                <Box>
                    <Text size="xsmall">* This is ignoring the wizard&apos;s charge, since you can just .. use it.</Text>
                    <ShadowBox background="dark-1" pad="medium" gap="large" direction="row" wrap>
                        <ComponentAndLabel
                            label="Best Wizard"
                            component={
                                <Box direction="row" gap="small">
                                    <IconImage data={playerData[worship.bestWizardPlayerID].getClassImageData()} scale={0.8} />
                                    <Text>{playerData[worship.bestWizardPlayerID].playerName}</Text>
                                </Box>
                            }
                        />
                        <ComponentAndLabel
                            label="Charge with Charge Syphon"
                            component={
                                <Box direction="row" gap="small">
                                    <Stack>
                                        <Meter
                                            size="small"
                                            type="bar"
                                            background="accent-3"
                                            color="brand"
                                            values={[
                                                {
                                                    value: Math.round(worship.totalData.currentCharge),
                                                    label: 'Current total charge',
                                                    color: 'brand'
                                                }
                                            ]}
                                            max={worship.totalData.maxCharge} />
                                        <Box align="center" pad="xxsmall">
                                            <Text size="small">{Math.round(worship.totalData.currentCharge).toString()} ({(worship.totalData.currentCharge / worship.totalData.maxCharge * 100).toPrecision(3)}%)</Text>
                                        </Box>
                                    </Stack>
                                    <Text>{worship.totalData.maxCharge}</Text>
                                </Box>
                            }
                        />
                        <TextAndLabel label="Total Charge rate" text={`${Math.round(worship.totalData.chargeRate * 24)}% / day`} />
                        <ComponentAndLabel
                            label="Time till overflow"
                            component={
                                worship.totalData.overFlowTime > 0 ?
                                    <TimeDown size={TimeDisplaySize.Small} addSeconds={worship.totalData.overFlowTime} />
                                    : <Text>Overflowing, you are wasting charge!</Text>
                            }
                        />
                    </ShadowBox>
                </Box>
            }
            <Box direction="row" wrap justify="center">
                {playerData && playerData.map((player, index) => {
                    const timeToFull = (worship.playerData[index].maxCharge - worship.playerData[index].estimatedCharge) / (worship.playerData[index].chargeRate / 60 / 60);
                    return (
                        <ShadowBox key={index} background="dark-1" pad="medium" align="center" margin={{ right: 'large', bottom: 'small' }}>
                            <Box gap="small">
                                <Box direction="row" gap="small">
                                    <IconImage data={player.getClassImageData()} scale={0.8} />
                                    <Text>{player.playerName}</Text>
                                </Box>
                                <Box direction="row" gap="small">
                                    <Stack>
                                        <Meter
                                            size="small"
                                            type="bar"
                                            background="accent-3"
                                            color="brand"
                                            values={[
                                                {
                                                    value: Math.round(worship.playerData[index].estimatedCharge),
                                                    label: 'current',
                                                    color: 'brand'
                                                }
                                            ]}
                                            max={worship.playerData[index].maxCharge} />
                                        <Box align="center" pad="xxsmall">
                                            <Text size="small">{Math.round(worship.playerData[index].estimatedCharge).toString()} ({(worship.playerData[index].estimatedCharge / worship.playerData[index].maxCharge * 100).toPrecision(3)}%)</Text>
                                        </Box>
                                    </Stack>
                                    <Text>{worship.playerData[index].maxCharge}</Text>
                                </Box>
                                <Box direction="row" justify="between">
                                    <ComponentAndLabel
                                        label="Level"
                                        component={
                                            <Box direction="row">
                                                <Text>{player.skills.get(SkillsIndex.Worship)?.level.toString() ?? "0"}</Text>
                                                {
                                                    player.gear.tools[5] != undefined &&
                                                    <Box title={player.gear.tools[5].displayName}>
                                                        <IconImage data={player.gear.tools[5].getImageData()} scale={0.7} />
                                                    </Box>
                                                }
                                            </Box>
                                        }
                                    />
                                    <TextAndLabel label="Charge rate" text={`${Math.round(worship.playerData[index].chargeRate * 24)}% / day`} />
                                </Box>
                                <ComponentAndLabel
                                    label="Time till full"
                                    component={
                                        timeToFull > 0 ?
                                            <TimeDown size={TimeDisplaySize.Small} addSeconds={timeToFull} />
                                            : <Text>Charge is full!</Text>
                                    }
                                />
                            </Box>
                        </ShadowBox>
                    )
                })
                }
            </Box>
        </Box>
    )
}

function TotemDisplay() {
    const [efficiency, setEfficiency] = useState<number>(0);
    const [effFoodBonus, setEffFoodBonus] = useState<number>(0);
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext);

    const theData = appContext.data.getData();
    const worship = theData.get("worship") as WorshipDomain;

    return (
        <Box gap="medium">
            <Box width="medium" gap="medium" direction="row">
                <ComponentAndLabel
                    label="Worship Efficiency"
                    component={<Box direction="row" align="center" gap="large"><TextInput
                        value={efficiency}
                        onChange={event => setEfficiency(Number(event.target.value))}
                        type="number"
                    /></Box>}
                />
                <ComponentAndLabel
                    label="Worship food effect"
                    component={<Box direction="row" align="center" gap="large"><TextInput
                        value={effFoodBonus}
                        onChange={event => setEffFoodBonus(Number(event.target.value))}
                        type="number"
                    /></Box>}
                />
            </Box>
            <Box>
                <Text size="xsmall">* Base XP is assuming multiplier of 1x.</Text>
                <Text size="xsmall">* You need a minimum efficiency of 60, 250, 1000, 3000, 8000, and 25000 on the respective totems to get bonus souls.</Text>
            </Box>
            <Grid columns={{ count: size == "small" ? 1 : 2, size: 'auto' }}>
                {
                    worship.totemInfo.map((totem, index) => (
                        <ShadowBox key={index} background="dark-1" pad="medium" align="start" margin={{ right: 'large', bottom: 'small' }}>
                            <Grid columns={{ count: 5, size: 'auto' }} gap={{ column: 'medium' }} fill>
                                <TextAndLabel text={totem.name} label="Name" />
                                <TextAndLabel text={totem.map.data.map.name ?? ""} label="Area" />
                                <TextAndLabel text={totem.maxWave.toString()} label="Max Wave" />
                                <TextAndLabel text={Math.floor(totem.getExpRewards() / totem.getChargeCost()).toString()} label="XP Per Charge" />
                                <TextAndLabel text={totem.getSoulRewards(efficiency, effFoodBonus).toString()} label="Souls" />
                            </Grid>
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )

}

function PrayerDisplay() {
    const appContext = useContext(AppContext);

    const theData = appContext.data.getData();
    const prayers = theData.get("prayers") as Prayer[];
    const storage = theData.get("storage") as Storage;

    return (
        <Box gap="medium">
            {
                Array.from(GroupByFunction(prayers.filter(prayer => prayer.data.name != "Some Prayer Name0"), function (base: PrayerBase) { return base.data.unlockZone }).entries()).map(([_, prayers], index) => (
                    <Box key={index} gap="small">
                        <Text>{prayers[0].data.unlockZone}</Text>
                        {
                            prayers.map((prayer, index) => {
                                const amountInStorage = storage?.amountInStorage(prayer.data.soul) ?? 0;
                                const costToNextLevel = prayer.getLevelCosts();
                                const costToMax = prayer.getCostToMax();
                                return (
                                    <ShadowBox key={`prayer_${index}`} background="dark-1" pad="medium" align="start" margin={{ right: 'large', bottom: 'small' }} style={{opacity: prayer.level == 0 ? 0.5 : 1}}>
                                        <Grid columns={{ count: 7, size: 'auto' }} gap={{ column: 'medium' }} fill>
                                            <IconImage data={prayer.getImageData()} />
                                            <TextAndLabel textSize='small' text={prayer.data.name} label="Name" />
                                            <TextAndLabel textSize='small' text={`${prayer.level.toString()}/${prayer.data.maxLevel.toString()}`} label="Level" />
                                            <TextAndLabel textSize='xsmall' text={prayer.getBonusText()} label="Bonus" />
                                            <TextAndLabel textSize='xsmall' text={prayer.getCurseText()} label="Curse" />
                                            {prayer.level == prayer.data.maxLevel && <Box align="center" justify="center"><Text color="green-1" size="large">Maxed!</Text></Box>}
                                            {prayer.level == 0 && <TextAndLabel textSize='small' text={prayer.data.unlockWave.toString()} label="Wave Req" />}
                                            {prayer.level > 0 && prayer.level != prayer.data.maxLevel && <TextAndLabel textSize='small' textColor={costToNextLevel < amountInStorage ? 'green-1' : 'white'} text={nFormatter(costToNextLevel, "Smaller")} label="Cost to next" />}
                                            {prayer.level > 0 && prayer.level != prayer.data.maxLevel && <TextAndLabel textSize='small' textColor={costToMax < amountInStorage ? 'green-1' : 'white'} text={nFormatter(costToMax, "Smaller")} label="Cost to max" />}

                                        </Grid>
                                    </ShadowBox>
                                )
                            })
                        }
                    </Box>
                ))
            }
        </Box>
    )

}

function Worship() {
    const [activeTab, setActiveTab] = useState<string>("Charge");

    return (
        <Box>
            <NextSeo title="Worship" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Worship</Heading>
            <Box gap="small">
                <Box align="center" direction="row" justify="center" gap="small">
                    {["Charge", "Totems", "Prayers"].map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                {activeTab == "Charge" && <ChargeDisplay />}
                {activeTab == "Totems" && <TotemDisplay />}
                {activeTab == "Prayers" && <PrayerDisplay />}
            </Box>
        </Box>
    )
}

export default Worship;