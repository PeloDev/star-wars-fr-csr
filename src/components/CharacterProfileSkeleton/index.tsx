import React from 'react';
import { 
    Box, 
    Center,
    CircularProgress,
    Grid,
    GridItem,
    Skeleton,
    Text
} from '@chakra-ui/react';

export default function CharacterProfileSkeleton() {
    return (
        <Box>
            <Center>
                <CircularProgress
                    isIndeterminate
                    size={30}
                    trackColor="transparent"
                    color="#ffc909"
                />
            </Center>
            <Grid
                templateColumns="repeat(12, 1fr)"
                gap={4}
            >
                <GridItem colSpan={5}>
                    <Skeleton startColor="red" endColor="blue" height={30} />
                </GridItem>
                <GridItem colSpan={2}>
                    <Text textAlign="center">:</Text>
                </GridItem>
                <GridItem colSpan={5}>
                    <Skeleton startColor="red" endColor="blue" height={30} />
                </GridItem>
                <GridItem colSpan={5}>
                    <Skeleton startColor="red" endColor="blue" height={30} />
                </GridItem>
                <GridItem colSpan={2}>
                    <Text textAlign="center">:</Text>
                </GridItem>
                <GridItem colSpan={5}>
                    <Skeleton startColor="red" endColor="blue" height={30} />
                </GridItem>
                <GridItem colSpan={5}>
                    <Skeleton startColor="red" endColor="blue" height={30} />
                </GridItem>
                <GridItem colSpan={2}>
                    <Text textAlign="center">:</Text>
                </GridItem>
                <GridItem colSpan={5}>
                    <Skeleton startColor="red" endColor="blue" height={30} />
                </GridItem>
                <GridItem colSpan={5}>
                    <Skeleton startColor="red" endColor="blue" height={30} />
                </GridItem>
                <GridItem colSpan={2}>
                    <Text textAlign="center">:</Text>
                </GridItem>
                <GridItem colSpan={5}>
                    <Skeleton startColor="red" endColor="blue" height={30} />
                </GridItem>
                <GridItem colSpan={5}>
                    <Skeleton startColor="red" endColor="blue" height={30} />
                </GridItem>
                <GridItem colSpan={2}>
                    <Text textAlign="center">:</Text>
                </GridItem>
                <GridItem colSpan={5}>
                    <Skeleton startColor="red" endColor="blue" height={30} />
                </GridItem>
            </Grid>
        </Box>
    );
}
