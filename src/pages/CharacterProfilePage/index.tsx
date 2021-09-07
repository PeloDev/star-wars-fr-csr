import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";
import { starWarsScrollBG } from "../../styles";
import { fetchPerson } from "../../core/api";
import { ICharacter } from "../../interfaces";
import { BiPlanet } from "react-icons/bi";
import { RiGenderlessLine } from "react-icons/ri";
import {
  GiBodyHeight,
  GiFemale,
  GiLightSabers,
  GiMale,
  GiWeight
} from "react-icons/gi";
import crossingSabersImg from "../../assets/images/crossing-light-sabers.png";
import { MdNavigateBefore } from "react-icons/md";
import CharacterProfileSkeleton from "../../components/CharacterProfileSkeleton";

interface IProps {
  characterID: string;
}

export default function CharacterProfilePage() {
  const history = useHistory();
  const params: { id: any } = useParams();

  const [character, setCharacter] = useState<ICharacter | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchPerson(params.id)
      .then((result: ICharacter | null) => {
        // console.log(result);
        if (result)
          setCharacter(result);
      })
      .catch((e: any) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (character) {
      setIsLoading(false);
    }
  }, [character]);

  return (
    <VStack minH="100vh" p={6} {...starWarsScrollBG} overflowY="auto" h="100vh">
      <Flex justifyContent="space-between" w="100%">
        <Box
          w="60px"
          cursor="pointer"
          onClick={() => {
            history.goBack();
          }}
        >
          <MdNavigateBefore color="#ffc909" size={30} />
        </Box>
        <Text my={1} letterSpacing={2} fontWeight={300} textAlign="center">
          Character Profile
        </Text>
        <Box w="60px" />
      </Flex>
      {isLoading ? (
        <CharacterProfileSkeleton />
      ) : (
        <>
          <Text my={1} fontSize={36} fontWeight={700} textAlign="center">
            {character?.name}
          </Text>
          <Box>
            <Image
              src={
                character
                  ? character.images
                    ? character.images[1].url
                    : ""
                  : ""
              }
            />
          </Box>
          {character &&
            Object.keys(character)
              .filter(
                (charKey) =>
                  charKey !== "id" &&
                  charKey !== "homeworld" &&
                  charKey !== "name" &&
                  charKey !== "images"
              )
              .map((charKey, charKeyIdx) => {
                let fieldName =
                  charKey === "homeworldOb" ? "homeworld" : charKey;
                let FieldIcon: any = GiLightSabers,
                  measure = "";
                switch (fieldName) {
                  case "height":
                    measure = isNaN(Number(character.height)) ? "" : "cm";
                    FieldIcon = GiBodyHeight;
                    break;
                  case "mass":
                    measure = isNaN(Number(character.mass)) ? "" : "kg";
                    FieldIcon = GiWeight;
                    break;
                  case "gender":
                    measure = "";
                    FieldIcon =
                      character.gender === "male"
                        ? GiMale
                        : character.gender === "female"
                          ? GiFemale
                          : RiGenderlessLine;
                    break;
                  case "homeworld":
                    measure = "";
                    FieldIcon = BiPlanet;
                    break;
                }
                return (
                  <Box
                    key={`character-profile-${params.id}-${fieldName}`}
                    my={6}
                  >
                    <Center>
                      <Box animation="driftInSpace infinite 16s linear">
                        <FieldIcon size={30} color="#ffc909" />
                      </Box>
                    </Center>
                    <Grid
                      templateColumns="repeat(12, 1fr)"
                      gap={4}
                      fontSize={[14, 15, 16]}
                    >
                      <GridItem colSpan={5}>
                        <Text
                          textAlign="right"
                          textTransform="capitalize"
                          fontWeight={300}
                        >
                          {fieldName}
                        </Text>
                      </GridItem>
                      <GridItem colSpan={2}>
                        <Text textAlign="center">:</Text>
                      </GridItem>
                      <GridItem colSpan={5}>
                        <Text textAlign="left">
                          {charKey === "homeworldOb"
                            ? character[charKey as keyof ICharacter].name
                            : character[charKey as keyof ICharacter]}
                          {measure}
                        </Text>
                      </GridItem>
                    </Grid>
                  </Box>
                );
              })}
        </>
      )}
      <Image
        w="100vw"
        px={"10%"}
        fit="contain"
        pos="relative"
        top={"-12vw"}
        src={crossingSabersImg}
      />
    </VStack>
  );
}
