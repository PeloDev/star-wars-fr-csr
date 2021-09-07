import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Box,
  Center,
  CircularProgress,
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
import starsBG from "../../assets/images/stars.png"
import Footer from "../../components/Footer";

interface IProps {
  characterID: string;
}

export default function CharacterProfilePage() {
  const history = useHistory();
  const params: { id: any } = useParams();

  const [character, setCharacter] = useState<ICharacter | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [homeWorldBG, setHomeWorldBG] = useState(starsBG);

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
    console.log(character);
    if (character) {
      console.log(character);
      setIsLoading(false);
      if (character.homeworldOb)
        if (character.homeworldOb.image)
          setHomeWorldBG(character.homeworldOb.image);
    }
  }, [character]);


  return (
    <VStack
      {...starWarsScrollBG}
      backgroundImage={homeWorldBG}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      minH="100vh"
      overflowY="auto"
      h="100vh"
    >
      <Box backgroundColor="rgba(0,0,0,0.4)" pt={6} w="100%">
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
            <Center minW="95vw">
              <Image

                maxH={"800px"}
                maxW={"600px"}
                // h="50vh"
                fit="cover"
                // bg="rgba(255,255,255,0.1)"
                animation="revealImage 1s linear"
                src={
                  character
                    ? character.image
                      ? character.image
                      : ""
                    : ""
                }
                fallback={
                  <Center
                    maxH={600}
                    h="50vh"
                  >
                    <CircularProgress
                      isIndeterminate
                      size={30}
                      trackColor="transparent"
                      color="#ffc909"
                    />
                  </Center>
                }
              />
            </Center>
            {character &&
              Object.keys(character)
                .filter(
                  (charKey) =>
                    charKey !== "id" &&
                    charKey !== "homeworld" &&
                    charKey !== "name" &&
                    !charKey.includes("image")
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
                        fontSize={[24, 27, 30]}
                      >
                        <GridItem colSpan={5}>
                          <Text
                            textAlign="right"
                            textTransform="capitalize"
                            fontWeight={500}
                            py={1}
                          >
                            {fieldName}
                          </Text>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <Text textAlign="center" py={1}>:</Text>
                        </GridItem>
                        <GridItem colSpan={5}>
                          <Text
                            textAlign="left"
                            fontSize={[27, 30, 33]}
                            fontWeight={700}
                          >
                            {charKey === "homeworldOb"
                              ? character[charKey as keyof ICharacter].name
                              : character[charKey as keyof ICharacter]}
                            <span style={{ fontSize: 16, fontWeight: 300 }}>{measure}</span>
                          </Text>
                        </GridItem>
                      </Grid>
                    </Box>
                  );
                })}
          </>
        )}
        {/* <Image
          w="100vw"
          px={"10%"}
          fit="contain"
          pos="relative"
          top={"-12vw"}
          src={crossingSabersImg}
        /> */}
        <Box w="100%" position="relative">
          <Footer />
        </Box>
      </Box>
    </VStack>
  );
}
