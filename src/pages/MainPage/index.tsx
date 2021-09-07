import React, { useEffect, useRef, useState } from "react";
import { Box, Center, CircularProgress, Flex, Image, VStack } from "@chakra-ui/react";
import SWScrollingText from "../../components/SWScrollingText";
import { starWarsScrollBG } from "../../styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { localStorageKey } from "../../core/app-context";
import { ICharacter, ICharactersResult } from "../../interfaces";
import { fetchPeople, searchPerson } from "../../core/api";
import Paginator from "../../components/Paginator";
import CharactersTable from "../../components/CharactersTable";
import SearchBar from "../../components/SearchBar";

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollingText, setShowScrollingText] = useState(
    JSON.parse(localStorage.getItem(`${localStorageKey}2`) ?? "{}")
      .mainPageNum === undefined
  );
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [total, setTotal] = useState<number | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  function setCurrentPageFromLocalStorage() {
    if (typeof window !== "undefined") {
      if (
        JSON.parse(localStorage.getItem(`${localStorageKey}2`) ?? "{}")
          .mainPageNum
      ) {
        let localCurrentPage = JSON.parse(
          localStorage.getItem(`${localStorageKey}2`) ?? "{}"
        ).mainPageNum;
        if (localCurrentPage !== currentPage) {
          setCurrentPage(localCurrentPage);
          return true;
        }
      }
    }

    return false;
  }

  async function getPeople(pg: number, resetPeople = false) {
    if (currentPage === pg && !resetPeople) return;
    let p = pg < 1 ? currentPage : pg;
    setIsLoading(true);
    await fetchPeople(p)
      .then((result: ICharactersResult | null) => {
        if (result) {
          setTotal(result.total);
          setCurrentPage(p);
          setCharacters(result.people as ICharacter[]);
          if (p) {
            if (typeof window !== "undefined") {
              let newLC = JSON.parse(
                localStorage.getItem(`${localStorageKey}2`) ?? "{}"
              );
              newLC.mainPageNum = p;
              localStorage.setItem(
                `${localStorageKey}2`,
                JSON.stringify(newLC)
              );
            }
          }
        }
      })
      .catch((e: any) => console.log(e))
      .finally(() => {
        setIsLoading(false);
        setSearchName("");
      });
  }

  function searchPeople() {
    setIsLoading(true);
    searchPerson(searchName)
      .then((result: ICharacter[] | null) => {
        if (result)
          setCharacters(result);
      })
      .catch((e: any) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (searchName.length > 0) {
      searchPeople();
    } else {
      getPeople(currentPage, true);
    }
  }, [searchName]);
  useEffect(() => {
    if (
      characters.length < 1 &&
      searchName.length < 1 &&
      !setCurrentPageFromLocalStorage()
    ) {
      getPeople(currentPage, true);
    } else {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [characters]);
  useEffect(() => {
    let misAligned = setCurrentPageFromLocalStorage();
    if (!misAligned && characters.length < 1 && searchName.length < 1) {
      getPeople(currentPage, true);
    }
    if (typeof window !== "undefined") {
      window.history.replaceState(
        window.history.state,
        "Star Wars Character Search",
        `/${currentPage}`
      );
    }
  }, [currentPage]);

  function handleSearch(e: React.FormEvent<HTMLInputElement>) {
    let name: string = e.currentTarget.value;
    setSearchName(name);
  }

  return (
    <Box {...starWarsScrollBG}>
      {showScrollingText ? (
        <SWScrollingText
          onAnimationEnd={() => {
            setShowScrollingText(false);
          }}
        />
      ) : (
        <Box h="100vh" overflowY="auto">
          <Box ref={topRef} />
          <Header />
          <Box p={6}>
            <Flex flexWrap="wrap-reverse">
              <Image
                w={240}
                h={240}
                fit="contain"
                src="https://res.cloudinary.com/dhrbbwjkf/image/upload/v1630964503/star-wars/characters/r2-d2.png"
                pos="relative"
                animation="driftInSpace infinite 8s linear"
                fallback={
                  <VStack
                    w={240}
                    h={240}
                    justify="center"
                  >
                    <Center>
                      <CircularProgress
                        isIndeterminate
                        size={30}
                        trackColor="transparent"
                        color="#ffc909"
                      />
                    </Center>
                  </VStack>
                }
              />
              <SearchBar
                isLoading={isLoading}
                searchName={searchName}
                handleSearch={handleSearch}
              />
            </Flex>
            <Box px={[0, "10%", "20%"]}>
              <CharactersTable characters={characters} />
            </Box>
            <Paginator
              count={characters.length}
              total={total ?? 0}
              pageNumber={currentPage}
              searchName={searchName}
              isLoading={isLoading}
              onNavigate={async (pg) => {
                await getPeople(pg);
              }}
            />
          </Box>
          <Footer />
        </Box>
      )}
    </Box>
  );
}
