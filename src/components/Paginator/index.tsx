import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    CircularProgress,
    Flex,
    Text
} from '@chakra-ui/react';

interface IProps {
    count: number;
    total: number;
    pageNumber: number;
    searchName: string;
    isLoading: boolean;
    onNavigate: (page: number) => Promise<void>;
}

export default function Paginator({ count, total, pageNumber, searchName, isLoading, onNavigate }: IProps) {

    const [pages, setPages] = useState<number[]>([]);
    const [startIdx, setStartIdx] = useState(0);
    const [endIdx, setEndIdx] = useState(0);
    const [paginatorKey, setPaginatorKey] = useState<string>((new Date()).getMilliseconds().toString())

    useEffect(() => {
        let newPagesCount = Math.ceil(total / 10);
        let newPages: number[] = [];
        for (let p = 1; p <= newPagesCount; p++)
            newPages.push(p);
        setPages(newPages);
    }, [count, total])
    useEffect(() => {
        setStartIdx(((pageNumber - 1) * 10) + 1);
        let endIdxCandidate = pageNumber * 10;
        setEndIdx((endIdxCandidate < total && total > 0) ? endIdxCandidate : total);
    }, [pages, pageNumber])

    return (
        <Box
            key={`paginator-${paginatorKey}`}
        >
            <Text
                textAlign="center"
                mb={0}
            >
                Page
            </Text>
            <Flex
                justifyContent="center"
            >
                {
                    isLoading
                        ? <CircularProgress
                            my={4}
                            isIndeterminate
                            size={30}
                            trackColor="transparent"
                            color="#ffc909"
                        />
                        : !searchName && pages
                            .map((pg) => (
                                <Text
                                    key={`page-nav-number-${pg}`}
                                    color={pageNumber === pg ? "#ffc909" : "#888"}
                                    fontSize={18}
                                    fontWeight={pageNumber === pg ? 700 : 500}
                                    textDecor={pageNumber === pg ? 'underline' : 'none'}
                                    mx={3}
                                    cursor="pointer"
                                    onClick={() => {
                                        onNavigate(pg).then(() => {
                                            setPaginatorKey((new Date()).getMilliseconds().toString());
                                        });
                                    }}
                                >
                                    {pg}
                                </Text>
                            ))
                }
            </Flex>

            {
                searchName
                    ?
                    isLoading
                        ? <CircularProgress
                            my={4}
                            isIndeterminate
                            size={30}
                            trackColor="transparent"
                            color="#ffc909"
                        />
                        : <Text
                            textAlign="center"
                        >
                            {count} results for search "{searchName}"
                        </Text>
                    : <Text
                        textAlign="center"
                    >
                        {startIdx} - {endIdx} of {total}
                    </Text>
            }
        </Box>
    );
}
