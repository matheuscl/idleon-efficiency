import {
    Box,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useMemo, useState } from 'react';
import ShadowBox from '../../components/base/ShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../components/base/TextAndLabel';
import { TimeDown } from '../../components/base/TimeDisplay';
import { AppContext } from '../../data/appContext';
import { Gaming as GamingDomain, TotalizerBonus } from '../../data/domain/gaming';
import { nFormatter, bitsFormatter } from '../../data/utility';

// Gaming[0] = current bits
// Gaming[6] = Unlocked imports?
// "GamingSprout")[25][1] = current water?

function Gaming() {
    const [gaming, setGaming] = useState<GamingDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setGaming(theData.get("gaming"));
        }
    }, [appContext]);

    const nuggetRange = useMemo(() => {
        if (!gaming) {
            return [-1, -1];
        }

        return gaming.getNuggetRange();
    }, [gaming])

    if (!gaming) {
        return (
            <Box>
                Still loading or something is wrong.
            </Box>
        )
    }
    return (
        <Box>
            <NextSeo title="Gaming" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Gaming</Heading>
            <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
            <Box direction="row" margin={{ top: 'small' }}>
                {
                    gaming.importBoxes[0].level > 0 &&
                    <ShadowBox width="medium" margin={{ right: 'large', bottom: 'small' }} background="dark-1" gap="xsmall" pad="medium" align="center">
                        <ComponentAndLabel
                            label="Next Water In"
                            component={
                                <TimeDown addSeconds={gaming.getNextWaterTime()} />
                            }
                        />
                        <Text margin={{ top: 'small' }} color="accent-3" size="12px">* Might be off by a few seconds.</Text>
                        <Text color="accent-3" size="12px">Current water: {gaming.getCurrentWater()}</Text>
                    </ShadowBox>
                }
                {
                    gaming.importBoxes[1].level > 0 &&
                    <ShadowBox width="medium" margin={{ right: 'large', bottom: 'small' }} background="dark-1" gap="xsmall" pad="medium" align="center">
                        <ComponentAndLabel
                            label="Next Dig In"
                            component={
                                <TimeDown addSeconds={gaming.getNextShovelTime()} />
                            }
                        />
                        <Text margin={{ top: 'small' }} color="accent-3" size="12px">* Might be off by a few seconds.</Text>
                        <Text color="accent-3" size="12px">Current digs: {gaming.getShovelCount()}</Text>
                        <Text color="accent-3" size="12px">Nugget range: {nFormatter(nuggetRange[0])}-{nFormatter(nuggetRange[1])}</Text>
                    </ShadowBox>
                }
            </Box>
        </Box>
    )
}

export default Gaming;