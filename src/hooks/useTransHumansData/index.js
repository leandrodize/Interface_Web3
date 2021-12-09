import { useCallback, useEffect, useState } from "react";
import useTransHumans from "../useTransHumans";

const getTransHumansData = async ({ TransHumans, tokenId }) => {
  const [
    tokenURI,
    adn,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    TransHumans.methods.tokenURI(tokenId).call(),
    TransHumans.methods.tokenADN(tokenId).call(),
    TransHumans.methods.ownerOf(tokenId).call(),
    TransHumans.methods.getAccessoriesType(tokenId).call(),
    TransHumans.methods.getAccessoriesType(tokenId).call(),
    TransHumans.methods.getClotheColor(tokenId).call(),
    TransHumans.methods.getClotheType(tokenId).call(),
    TransHumans.methods.getEyeType(tokenId).call(),
    TransHumans.methods.getEyeBrowType(tokenId).call(),
    TransHumans.methods.getFacialHairColor(tokenId).call(),
    TransHumans.methods.getFacialHairType(tokenId).call(),
    TransHumans.methods.getHairColor(tokenId).call(),
    TransHumans.methods.getHatColor(tokenId).call(),
    TransHumans.methods.getGraphicType(tokenId).call(),
    TransHumans.methods.getMouthType(tokenId).call(),
    TransHumans.methods.getSkinColor(tokenId).call(),
    TransHumans.methods.getTopType(tokenId).call(),
  ]);

  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    tokenURI,
    adn,
    owner,
    ...metadata,
  };
};

// Plural
const useTransHumansData = () => {
  const [trans, setTrans] = useState([]);
  const [loading, setLoading] = useState(true);
  const TransHumans = useTransHumans();

  const update = useCallback(async () => {
    if (TransHumans) {
      setLoading(true);

      let tokenIds;

      const totalSupply = await TransHumans.methods.totalSupply().call();
      tokenIds = new Array(Number(totalSupply)).fill().map((_, index) => index);

      const transPromise = tokenIds.map((tokenId) =>
        getTransHumansData({ tokenId, TransHumans })
      );

      const trans = await Promise.all(transPromise);

      setTrans(trans);
      setLoading(false);
    }
  }, [TransHumans]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    trans,
    update,
  };
};


export { useTransHumansData };