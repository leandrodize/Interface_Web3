import { useMemo } from "react";
import {useWeb3React} from "@web3-react/core";
import TransHumansArtifacts from "../../config/artifacts/ABI_TransHumans";

const { address, abi } = TransHumansArtifacts;

const useTransHumans = () => {
  const { active, library, chainId } = useWeb3React();

  const TransHumans = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, TransHumans?.eth?.Contract]);

  return TransHumans ;
};

export default useTransHumans;