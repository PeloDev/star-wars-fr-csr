import React from 'react';
import {
    Box,
    Flex,
    Image,
    Text,
    VStack
} from '@chakra-ui/react';
import swLogo from '../../assets/vectors/star-wars.svg';


export default function Header() {
    return (
        <Flex
            justify="center"
            bgGradient="linear-gradient(black, transparent)"
            py={4}
        >
            <VStack
                justify="center"
            >
                <Box
                    w={400}
                >
                    <Image
                        px={"30%"}
                        src={swLogo}
                        my={-12}
                    />
                </Box>
                <Text
                    textAlign="center"
                >
                    Character Search
                </Text>
            </VStack>

        </Flex>
    );
}
