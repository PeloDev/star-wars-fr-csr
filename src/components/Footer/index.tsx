import React from "react";
import { Box, Flex, Image, Link, Text, VStack } from "@chakra-ui/react";
import { localStorageKey } from "../../core/app-context";

export default function Footer() {
  return (
    <VStack justify="center" bg="black" py={6}>
      <Text my={0} fontSize={20}>
        Star Wars Character Search
      </Text>
      <Text my={0} fontWeight={300}>
        {new Date().getFullYear()}
      </Text>
      <Text
        my={0}
        fontWeight={300}
        cursor="pointer"
        _hover={{ fontWeight: 500 }}
        animation="driftInSpace infinite 8s linear"
        onClick={() => {
          localStorage.setItem(`${localStorageKey}2`, JSON.stringify({}));
          window.location.replace("/");
        }}
      >
        View App Crawl
      </Text>
      <Text my={2} fontWeight={400}>
        Contact
        <Link fontWeight={500} href="mailto:zuma.boipelo@gmail.com">
          {" "}
          Boipelo Zuma
        </Link>
      </Text>
    </VStack>
  );
}
