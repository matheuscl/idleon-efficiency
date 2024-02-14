import {
    Box,
    Grid,
    Heading,
    Text,
} from "grommet"

import { useEffect, useState, useContext } from 'react';
import ShadowBox from "../../components/base/ShadowBox";
import { AppContext } from '../../data/appContext';
import { NextSeo } from 'next-seo';
import { Player } from "../../data/domain/player";
import LeftNavButton from "../../components/base/LeftNavButton";
import ObolsInfo from "../../components/account/task-board/obolsInfo";
import { Card, Cards as CardsDomain } from "../../data/domain/cards";
import TextAndLabel from "../../components/base/TextAndLabel";
import TipDisplay, { TipDirection } from "../../components/base/TipDisplay";
import { ItemStat } from "../../data/domain/items";
import IconImage from "../../components/base/IconImage";

function Cards() {
    const [cards, setCards] = useState<CardsDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        // console.log(appContext.data.getData())
        setCards(appContext.data.getData().get("cards"));
        console.log(cards)
    }, [appContext]);

    return (
        <Box pad="medium">
            <Grid columns={["25%", "25%", "25%", "25%"]} width={{ max: '200px' }} gap={{ row: "small" }}>
                {
                    player.cardInfo ? player.cardInfo.equippedCards.filter(card => card.id != "Empty").map((card, index) => {
                        return (
                            <Box key={index}>
                                <Stack key={index}>
                                    <Box>
                                        <IconImage data={card.getImageData()} />
                                    </Box>
                                    <TipDisplay
                                        heading={`${card.displayName}`}
                                        body={card.getBonusText()}
                                        size={size}
                                        direction={TipDirection.Down}
                                    >
                                        <Box>
                                            <IconImage data={card.getBorderImageData()} />
                                        </Box>
                                    </TipDisplay>
                                </Stack>

                            </Box>
                        )
                    }) : <Text>No cards equipped</Text>
                }
            </Grid>
            <Text>Oiii</Text>
        </Box>
    )
}

export default Cards;