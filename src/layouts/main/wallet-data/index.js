import {
    Flex,
    Button,
    Tag,
    Badge,
    TagCloseButton,
  } from "@chakra-ui/react";
  import { AddIcon } from "@chakra-ui/icons";
  import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
  import { connector } from "../../../config/web3";
  import { useCallback, useEffect, useState } from "react";
  
  const WalletData = () => {
    const [balance, setBalance] = useState(0);
    const { active, activate, deactivate, account, error, library } =
      useWeb3React();
  
    const isUnsupportedChain = error instanceof UnsupportedChainIdError;
  
    const connect = useCallback(() => {
      activate(connector);
      localStorage.setItem("previouslyConnected", "true");
    }, [activate]);
   
    const disconnect = () => {
      deactivate();
      localStorage.removeItem("previouslyConnected");
    };
  
    const getBalance = useCallback(async () => {
      const toSet = await library.eth.getBalance(account);
      setBalance((toSet / 1e18).toFixed(2));
    }, [library?.eth, account]);
  
    useEffect(() => {
      if (active) getBalance();
    }, [active, getBalance]);
  
    useEffect(() => {
      if (localStorage.getItem("previouslyConnected") === "true") connect();
    }, [connect]);
  
  
    return (
      <Flex alignItems={"center"}>
        {active ? (
          <Tag colorScheme="blue" borderRadius="full">
            <Badge
              d={{
                base: "none",
                md: "block",
              }}
              variant="solid"
              fontSize="0.8rem"
              ml={1}
            >
              ~{balance} Ξ
            </Badge>
            <TagCloseButton onClick={disconnect} /> 
          </Tag>
        ) : (
          <Button
            variant={"solid"}
            colorScheme={"blue"}
            size={"sm"}
            leftIcon={<AddIcon />}
            onClick={connect} 
            //boton de coneccion
            disabled={isUnsupportedChain}
          >
            {isUnsupportedChain ? "Red no soportada" : "Conectar wallet"}
          </Button>
        )}
      </Flex>
    );
  };
  
  export default WalletData;