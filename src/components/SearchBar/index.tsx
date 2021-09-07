import {
    Box,
    CircularProgress,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    VStack
} from '@chakra-ui/react';
import React from 'react';
import { MdSearch } from 'react-icons/md';


interface IProps {
    isLoading: boolean;
    searchName: string;
    handleSearch: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ isLoading, searchName, handleSearch }: IProps) {

    return (
        <VStack
            flex={1}
            justifyContent="center"
            minW="280px"
            mr={[0, "10%", "15%"]}
            my={4}
        >
            <Flex
                justifyContent="center"
                w="100%"
            >
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<MdSearch color="grey" />}
                    />
                    <Input
                        _focus={{ borderColor: "swYellow" }}
                        color="#ffc909"
                        type="text"
                        placeholder="Search"
                        value={searchName}
                        onChange={handleSearch}
                    />
                    {
                        isLoading &&
                        <InputRightElement
                            pointerEvents="none"
                            children={
                                <Box
                                    mr={8}
                                >
                                    <CircularProgress
                                        isIndeterminate
                                        size={30}
                                        trackColor="transparent"
                                        color="#ffc909"
                                    />
                                </Box>
                            }
                        />
                    }

                </InputGroup>
            </Flex>
        </VStack>
    );
}
