import { useWeb3React } from "@web3-react/core";
import { Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NFTcard from "../../components/nft-card/index";
import RequestAccess from "../../components/request-acces";
import Loading from "../../components/loading";
import { useTransHumansData } from "../../hooks/useTransHumansData";

const Gallery = () => {
  const { active } = useWeb3React();
  const { trans, loading } = useTransHumansData();

  if (!active) return <RequestAccess />;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {trans.map(({ name, image, tokenId }) => (
            <Link key={tokenId} to={`/trans/ ${tokenId}`}>
              <NFTcard  image={image} name={name} />
            </Link>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Gallery;





