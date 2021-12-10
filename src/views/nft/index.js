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
    useToast,
  } from "@chakra-ui/react";
  import { useWeb3React } from "@web3-react/core";
  import RequestAccess from "../../components/request-acces";
  import NFTcard from "../../components/nft-card";
  import { useTransHumansData } from "../../hooks/useTransHumansData";
  import { useParams } from "react-router-dom";
  import Loading from "../../components/loading";
  import { useState } from "react";
  
  const NFT = () => {
    const { active, account, library } = useWeb3React();
    const { tokenId } = useParams();
    const { loading, trans, update } = useTransHumansData(tokenId);
    const toast = useToast();
    const [transfering, setTransfering] = useState(false);
    const TransHumans = useTransHumansData();

    const transfer = () => {
      setTransfering(true);
      const address = prompt("Ingresa la direccion");
      const isAddress = library.utils.isAddress(address);

      if (!isAddress) {
        toast({
          title: "Direccion invalida",
          description: "Por favor ingresa una direccion valida",
          status: "error",
        });
        setTransfering(false);
      }else{
        TransHumans.methods
        .safeTransferFrom(trans.owner, address, trans.tokenId)
        .send({
          from: account,
        })
        .on('error', () => {
          setTransfering(false);
        })
        .on('transactionHash', (txHash) =>{
          toast({
            title: "Transaccion Invalida",
            description: txHash,
            status: "info",
          });
        })
        .on('receipt', () => {
          setTransfering(false);
          toast({
            title: "Transaccion Confirmada",
            description: `El NFT le pertenece a ${address}`,
            status: "success",
          });
          update();
        });
      }

    }
  
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
          <Button 
            onClick={transfer} 
            disabled={account !== trans.owner} 
            colorScheme="blue"
            isLoading={transfering}
            >
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