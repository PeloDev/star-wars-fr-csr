import React, {
  AnimationEventHandler,
  useEffect,
  useRef,
  useState
} from "react";
import { Box, Center, Image, Text, VStack } from "@chakra-ui/react";
import {
  h1,
  h2,
  starWarsScrollText,
  starWarsScrollWrapper
} from "../../styles";
import swLogo from "../../assets/vectors/star-wars.svg";

interface IProps {
  crawlType?: "intro" | "about";
  onAnimationEnd: (e?: any) => void;
}

export default function SWScrollingText({
  crawlType = "intro",
  onAnimationEnd
}: IProps) {
  const [showCrawl, setShowCrawl] = useState(false);
  const [crawlTop, setCrawlTop] = useState(500);
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Box ref={boxRef} mt={showCrawl ? 0 : 0} className="sw-wrapper">
        {!showCrawl && (
          <VStack
            justify="center"
            pos="absolute"
            top={0}
            left={0}
            bottom={0}
            right={0}
            mx="auto"
            animation="swLogoAnim 10s linear"
            {...starWarsScrollText}
            onAnimationEnd={() => {
              setShowCrawl(true);
            }}
          >
            <Center pt={[80, 40, 0]}>
              <Image px={"30%"} src={swLogo} />
            </Center>
            <Text>Character Search</Text>
          </VStack>
        )}
        {showCrawl && (
          <Box
            key={`sw-crawler=${showCrawl.toString()}`}
            animation={[
              "swTextScroll 60s linear",
              "swTextScroll 54s linear",
              "swTextScroll 48s linear"
            ]}
            {...starWarsScrollText}
            onAnimationEnd={onAnimationEnd}
            top={crawlTop}
          >
            <Text textAlign="center" {...h1}>
              Character Search App
            </Text>
            <Text {...h2}>
              In a bustling city in the Non-Galactic Republic of South Africa,
              an application is written! Using the Serverless Framework on AWS
              Lambda, an ApolloGraphQL back-end, and lots and lots of
              Typescript, the Hackertists push their assualt on the enemy base
              on the planet of Github.
            </Text>
            {crawlType === "about" ? (
              <Text {...h2}>
                Theatrics aside, this application was built for a code
                assessment, and is deployed only for demonstrative purposes. The
                Star Wars data is sourced from the Star Wars API
                (https://swapi.dev/), and images gathered from various uncredted
                sources. <br />
                If you have any queries you can contact me (Boipelo) at
                zuma.boipelo@gmail.com.
              </Text>
            ) : (
              <Text {...h2}>
                View and search the extensive cast of characters from all 7 Star
                Wars films powered by The Star Wars API!
              </Text>
            )}
          </Box>
        )}
      </Box>
      <VStack
        justify="start"
        pos="absolute"
        h="100%"
        right={20}
        bottom={0}
        zIndex={100}
      >
        <Text
          cursor="pointer"
          onClick={() => {
            onAnimationEnd();
          }}
        >
          Continue to Website
        </Text>
      </VStack>
    </>
  );
}
