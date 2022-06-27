import {
    Box,
    Grid,
    Stack,
    Text,
    Tip,
    CheckBox,
    Select,
    Heading,
    ResponsiveContext
} from "grommet"
import styled from 'styled-components'

import { Alchemy as AlchemyData, Cauldron, Bubble, CauldronBoostIndex, Vial } from '../../data/domain/alchemy';
import { AchievementConst } from '../../data/domain/achievements'
import { useEffect, useState, useContext, useMemo } from 'react';
import { AppContext } from '../../data/appContext'
import { nFormatter, round } from '../../data/utility'
import { NextSeo } from 'next-seo';
import TabButton from "../../components/base/TabButton";
import { Item } from "../../data/domain/items";
import TipDisplay, { TipDirection } from "../../components/base/TipDisplay";
import { Ascending } from "grommet-icons";
import IconImage from "../../components/base/IconImage";
import { Sigils } from "../../data/domain/sigils";
import TextAndLabel, { ComponentAndLabel } from "../../components/base/TextAndLabel";
import { TimeDown } from "../../components/base/TimeDisplay";

const CapitalizedH3 = styled.h3`
    text-transform: capitalize
`

const ShadowBox = styled(Box)`
    box-shadow: -7px 8px 16px 0 rgba(0,0,0,0.17)
`

interface DisplayProps {
    cauldron: Cauldron,
    undevelopedCostsBubbleLevel: number,
    barleyBrewVialLevel: number,
    hasAchievement: boolean,
    discountLevel: number,
    classMultiBonus: boolean
    vialMultiplier: number
}

function CauldronDisplay({ cauldron, undevelopedCostsBubbleLevel, barleyBrewVialLevel, hasAchievement, discountLevel, classMultiBonus, vialMultiplier = 1 }: DisplayProps) {
    const size = useContext(ResponsiveContext)
    const [bargainBubbleLevel, setBargainBubbleLevel] = useState(0);
    const [classMultiBubbleLevel, setClassMultiBubbleLevel] = useState(0);
    const [cauldronCostLevel, setCauldronCostLevel] = useState(0);
    const [newMultiBubbleLevel, setNewMultiBubbleLevel] = useState(0);

    useEffect(() => {
        setBargainBubbleLevel(cauldron.bubbles[14].level);
        if (cauldron.short_name != "Y") {
            setNewMultiBubbleLevel(cauldron.bubbles[16].level);
        }
        if (classMultiBonus && cauldron.short_name != "Y") {
            setClassMultiBubbleLevel(cauldron.bubbles[1].level)
        }
        else {
            setClassMultiBubbleLevel(0);
        }
        setCauldronCostLevel(cauldron.boostLevels[CauldronBoostIndex.Cost]);
    }, [cauldron.bubbles, cauldron.short_name, cauldron.boostLevels, classMultiBonus, undevelopedCostsBubbleLevel, barleyBrewVialLevel, hasAchievement, discountLevel])

    function TipContent({ bubble, faceLeft }: { bubble: Bubble, faceLeft: boolean }) {
        if (bubble.level == 0) {
            return <></>
        }
        const materialCosts: Map<Item, number> = bubble.getMaterialCost(cauldronCostLevel, undevelopedCostsBubbleLevel, barleyBrewVialLevel, bargainBubbleLevel, classMultiBubbleLevel, discountLevel, hasAchievement, newMultiBubbleLevel, vialMultiplier);
        return (
            <Box direction="row" align="center" width={{ max: 'medium' }}>
                {!faceLeft &&
                    <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
                        <polygon
                            fill="white"
                            points="6 2 18 12 6 22"
                            transform="matrix(-1 0 0 1 30 0)"
                        />
                    </svg>
                }
                <Box pad="small" gap="small" background="white">
                    <Text size={size == "small" ? 'small' : ''} weight="bold">{bubble.name} ({bubble.level})</Text>
                    <hr style={{ width: "100%" }} />
                    <Text size="small">Bonus: {bubble.getBonusText()}</Text>
                    {
                        Array.from(materialCosts).map(([item, cost]) => {
                            return (
                                <Box key={`${bubble.name}_${item.internalName}`} direction="row" align="center" ><Text size="small">Material Cost: {nFormatter(round(cost))}</Text><IconImage data={item.getImageData()} /></Box>
                            )
                        })
                    }
                </Box>
                {
                    faceLeft &&
                    <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
                        <polygon
                            fill="white"
                            points="0 2 12 12 0 22"
                        />
                    </svg>
                }
            </Box >
        )
    }


    return (
        <Box align="center">
            <Box align="center">
                <CapitalizedH3>{cauldron.name}</CapitalizedH3>
            </Box>
            <Box>
                {
                    Object.entries(cauldron.bubbles).map(([_, bubble], index) => {
                        return (
                            <Box key={`cauldron_${index}_${bubble.name}`}>
                                <Tip
                                    plain
                                    content={
                                        <TipContent bubble={bubble} faceLeft={cauldron.short_name == "Y"} />
                                    }
                                    dropProps={{ align: size == "small" ? { top: 'bottom' } : cauldron.short_name == "Y" ? { right: 'left' } : { left: 'right' } }}
                                >
                                    <Box direction="row" fill align="center">
                                        <Box style={{ opacity: bubble.level > 0 ? 1 : 0.2 }}>
                                            <IconImage data={bubble.getImageData()} scale={0.8} />
                                        </Box>
                                        <Box direction="row" gap="xsmall" align="center">
                                            <Text size="small">{bubble.level}</Text>
                                        </Box>
                                        {
                                            bubble.labUpgrade && <Ascending color="Legendary" size="large" />
                                        }
                                    </Box>
                                </Tip>
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

function VialTipInfo({ vial }: { vial: Vial }) {
    if (vial.level == 0) {
        return (
            <Box>
                <Text size="small">Bonus: {vial.getBonusText()}</Text>
                <Text size="small">You need to roll at least a {vial.getNumberToRoll()} to unlock this vial</Text>

            </Box>
        )
    }

    return (
        <Box>
            <Text size="small">Bonus: {vial.getBonusText()}</Text>
            {
                Array.from(vial.getMaterialCost()).map(([item, cost], index) => {
                    return (
                        <Box key={index} direction="row" align="center" ><Text size="small">Material Cost: {nFormatter(round(cost))}</Text><IconImage data={item.getImageData()} /></Box>
                    )
                })
            }
        </Box>
    )
}

function VialsDisplay() {
    const [alchemyData, setAlchemyData] = useState<AlchemyData>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext.data.getData().size > 0) {
            const theData = appContext.data.getData();
            setAlchemyData(theData.get("alchemy"));
        }
    }, [appContext]);

    return (
        <ShadowBox background="dark-1" pad="medium">
            <Box direction="row" wrap>
                {
                    alchemyData?.vials.map((vial, index) => (
                        <Box key={index} width={{ max: '104px', min: '104px' }} height={{ max: '120px', min: '120px' }}>
                            <TipDisplay
                                body={<VialTipInfo vial={vial} />}
                                heading={vial.name}
                                direction={TipDirection.Down}
                                size="medium"
                            >
                                <Stack anchor='center' margin={{ right: 'small' }}>
                                    <Box>
                                        <IconImage data={vial.getBackgroundImageData()} />
                                    </Box>
                                    <Box>
                                        <IconImage data={vial.getImageData()} scale={1.3} />
                                    </Box>
                                </Stack>
                            </TipDisplay>
                        </Box>
                    ))
                }
            </Box>
        </ShadowBox>
    )
}

function SigilsDisplay() {
    const [sigilData, setSigilData] = useState<Sigils>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext.data.getData().size > 0) {
            const theData = appContext.data.getData();
            setSigilData(theData.get("sigils"));
        }
    }, [appContext]);

    return (
        <Box pad="medium">
            <Grid columns="1/3">
                {
                    sigilData?.sigils.map((sigil, index) => {
                        const reqLimit = sigil.boostLevel < 0 ? sigil.data.unlockCost : sigil.data.boostCost;
                        const chargeSpeed = sigil.activePlayers * sigilData.chargeSpeed;
                        const timeToNext = ((reqLimit - sigil.progress) / chargeSpeed) * 3600;
                        return (
                            <ShadowBox background="dark-1" key={index} margin={{ right: 'small', bottom: 'small' }} gap="medium" align="start" pad="small" border={sigil.activePlayers > 0 ? { color: 'green-1', size: '1px' } : undefined}>
                                <IconImage style={sigil.boostLevel == 1 ? { filter: 'hue-rotate(190deg)' } : sigil.boostLevel == -1 ? { opacity: 0.2 } : undefined} data={sigil.getImageData()} />
                                <Box direction="row" gap="medium">
                                    <TextAndLabel textSize="xsmall" label="Name" text={sigil.data.name} />
                                    <TextAndLabel textSize="xsmall" label="Description" text={sigil.getBonusText()} />
                                </Box>
                                <Box direction="row" gap="medium">
                                    <TextAndLabel textSize="xsmall" label="Progress" text={sigil.boostLevel != 1 ? `${nFormatter(sigil.progress, "Smaller")}/${nFormatter(reqLimit, "Smaller")}` : "Maxed"} />
                                    {sigil.activePlayers > 0 &&
                                        <ComponentAndLabel
                                            label="Time To max"
                                            component={
                                                <TimeDown addSeconds={timeToNext} />
                                            }
                                        />
                                    }
                                </Box>
                            </ShadowBox>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

function BubblesDisplay() {
    const [alchemyData, setAlchemyData] = useState<AlchemyData>();
    const [hasAlchemyAchievement, setHasAlchemyAchievement] = useState<boolean>(false);
    const [discountLevel, setDiscountLevel] = useState<string>('0');
    const [classMulti, setClassMulti] = useState(false);
    const [undevelopedCostsBubbleLevel, setUndevelopedCostsBubbleLevel] = useState<number>(0);
    const [barleyBrewVialLevel, setBarleyBrewVialLevel] = useState<number>(0);
    const [vialMultiplier, setVialMulitplier] = useState<number>(1);

    const appContext = useContext(AppContext);

    const bargainOptions = [
        {
            label: 'No discount',
            value: '0',
        },
        {
            label: '25%',
            value: '1',
        },
        {
            label: '43.75%',
            value: '2',
        },
        {
            label: '57.81%',
            value: '3',
        },
        {
            label: '68.36%',
            value: '4',
        },
        {
            label: '76.27%',
            value: '5',
        },
        {
            label: '82.20%',
            value: '6',
        },
        {
            label: '86.65%',
            value: '7',
        },
        {
            label: '90%',
            value: '8',
        },
    ];

    useEffect(() => {
        if (appContext.data.getData().size > 0) {
            const theData = appContext.data.getData();
            setAlchemyData(theData.get("alchemy"));
            const achievementsInfo = theData.get("achievements");
            // get undeveloped costs bubble level
            setUndevelopedCostsBubbleLevel(alchemyData?.getUndevelopedCostsBubbleLevel() ?? 0);
            setBarleyBrewVialLevel(alchemyData?.getBarleyBrewVialLevel() ?? 0);
            setVialMulitplier(alchemyData?.vials[0].bonusMulitplier ?? 1);
            if (achievementsInfo) {
                setHasAlchemyAchievement(achievementsInfo[AchievementConst.SmartBoiIndex].completed ?? false);
            }
        }
    }, [appContext, alchemyData, hasAlchemyAchievement])

    if (alchemyData && alchemyData.cauldrons.flatMap(cauldron => cauldron.bubbles).filter(bubble => bubble.level > 0).length == 0) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }

    return (
        <ShadowBox background="dark-1" flex={false} pad={{ bottom: 'small' }}>
            <Box gap="large" align="center" direction="row" pad="medium">
                <CheckBox
                    checked={classMulti}
                    label="Class multiplier bonus?"
                    onChange={(event) => setClassMulti(event.target.checked)}
                />
                <Select
                    labelKey="label"
                    valueKey={{ key: 'value', reduce: true }}
                    value={discountLevel}
                    options={bargainOptions}
                    onChange={({ value: nextValue }) => setDiscountLevel(nextValue)}
                />
                <Box direction="row" align="center">
                    <Ascending color="Legendary" size="large" />
                    <Text size="xsmall">Indicates bubbles that will level from &quot;No Bubble Left Behind&quot; lab bonus</Text>
                </Box>

            </Box>
            <Grid columns="1/4">
                {
                    alchemyData && Object.entries(alchemyData.cauldrons).map(([_, cauldron], index) => {
                        return (<CauldronDisplay key={`tab_${index}`} cauldron={cauldron} undevelopedCostsBubbleLevel={undevelopedCostsBubbleLevel} barleyBrewVialLevel={barleyBrewVialLevel} hasAchievement={hasAlchemyAchievement} discountLevel={parseInt(discountLevel)} classMultiBonus={classMulti} vialMultiplier={vialMultiplier} />)
                    })
                }
                {
                    !alchemyData && <Text>Not ready yet</Text>
                }
            </Grid>
        </ShadowBox>)
}

function Alchemy() {
    const [activeTab, setActiveTab] = useState<string>("Bubbles");

    return (
        <Box>
            <NextSeo title="Alchemy" />
            <Box>
                <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Alchemy</Heading>
                <Box align="center" direction="row" justify="center" gap="small" margin={{ bottom: 'small' }}>
                    {["Bubbles", "Vials", "Sigils"].map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                {activeTab == "Bubbles" && <BubblesDisplay />}
                {activeTab == "Vials" && <VialsDisplay />}
                {activeTab == "Sigils" && <SigilsDisplay />}
            </Box>
        </Box>
    )
}

export default Alchemy;