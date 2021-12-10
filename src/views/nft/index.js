import {
    Stack,
    Heading,
    Text,
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Tbody,
    Button,
    Tag,
  } from "@chakra-ui/react";
  import { useWeb3React } from "@web3-react/core";
  import RequestAccess from "../../components/request-acces";
  import NFTcard from "../../components/nft-card";
  import { useTransHumansData } from "../../hooks/useTransHumansData";
  import { useParams } from "react-router-dom";
  import Loading from "../../components/loading";
  
  const NFT = () => {
    const { active, account } = useWeb3React();
    const { tokenId } = useParams();
    const { loading, trans } = useTransHumansData(tokenId);
  
    if (!active) return <RequestAccess />;
  
    if (loading) return <Loading />;
  
    return (
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack>
          <NFTcard
            mx={{
              base: "auto",
              md: 0,
            }}
            name={trans.name}
            image={trans.image}
          />
          <Button disabled={account !== trans.owner} colorScheme="blue">
            {account !== trans.owner ? "No eres el dueño" : "Transferir"}
          </Button>
        </Stack>
        <Stack width="100%" spacing={5}>
          <Heading>{trans.name}</Heading>
          <Text fontSize="xl">{trans.description}</Text>
          <Text fontWeight={600}>
            ADN:
            <Tag ml={2} colorScheme="blue">
              {trans.adn}
            </Tag>
          </Text>
          <Text fontWeight={600}>
            Owner:
            <Tag ml={2} colorScheme="blue">
              {trans.owner}
            </Tag>
          </Text>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Atributo</Th>
                <Th>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(trans.attributes).map(([key, value]) => (
                <Tr key={key}>
                  <Td>{key}</Td>
                  <Td>
                    <Tag>{value}</Tag>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Stack>
    );
  };
  
  export default NFT;