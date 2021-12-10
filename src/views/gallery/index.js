import { useWeb3React } from "@web3-react/core";
import {
  Grid,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  FormControl, 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {SearchIcon} from "@chakra-ui/icons";
import NFTcard from "../../components/nft-card/index";
import RequestAccess from "../../components/request-acces";
import Loading from "../../components/loading";
import { useTransHumansData } from "../../hooks/useTransHumansData";
import { useState } from "react";
import {useNavigate, useLocation} from "react-router-dom";

const Gallery = () => {
  const {search} = useLocation();
  const[address, setAddress] = useState(new URLSearchParams(search).get("address"));
  const [submitted, setSubmitted] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const { active, library } = useWeb3React();
  const { trans, loading } = useTransHumansData({owner: submitted && validAddress ? address : null});
  const {navigate} = useNavigate();

  const handleAddressChange = ({target: {value}}) =>{
    setAddress(value);
    setSubmitted(false);
    setValidAddress(false);
  };

  const submit = (event) => {
    event.preventDefault();

    if(address){
      const isValid = library.utils.isAddress(address);
      setValidAddress(isValid);
      setSubmitted(true);
      if(isValid) navigate(`/gallery?address=${address}`);
    }else{
      navigate("/gallery")
    }
  }

  if (!active) return <RequestAccess />;

  return (
    <>
      <form onSubmit={submit}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input 
              isInvalid={false}
              value={address ?? ''}
              onChange={handleAddressChange}
              placeholder="Buscar por address"
            />
            <InputRightElement>
              <Button type="submit" h="1.75rem" size="sm" >
                Buscar
              </Button>
            </InputRightElement>
          </InputGroup>
          {
            submitted && !validAddress && <FormHelperText>Direccion Invalida</FormHelperText>
          }
        </FormControl>
      </form>
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {trans.map(({ name, image, tokenId }) => (
            <Link key={tokenId} to={`/gallery/ ${tokenId}`}>
              <NFTcard  image={image} name={name} />
            </Link>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Gallery;





