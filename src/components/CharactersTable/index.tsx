import React from "react";
import { Link } from "react-router-dom";
import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { GiLightSabers } from "react-icons/gi";
import { ICharacter } from "../../interfaces";

interface IProps {
  characters: ICharacter[];
}

export default function CharactersTable({ characters }: IProps) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>
            <Flex justifyContent="end">View</Flex>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {characters.map((char, charIdx) => {
          return (
            <Tr
              key={`character-row-${char.name.replace(" ", "-").toLowerCase()}`}
              color="whiteAlpha.800"
              cursor="pointer"
              _hover={{
                color: "#ffc909",
                fontSize: 18,
                fontWeight: 700
              }}
            >
              <Td textTransform="capitalize">
                <Link to={`/character/${char.id}`}>{char.name}</Link>
              </Td>
              <Td>
                <Link to={`/character/${char.id}`}>
                  <Flex justifyContent="end">
                    <GiLightSabers />
                  </Flex>
                </Link>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
