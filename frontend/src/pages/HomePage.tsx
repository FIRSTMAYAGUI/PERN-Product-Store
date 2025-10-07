import { Text, Container, Stack, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import ProductCard from "../components/ProductCard";
import { useCallback, useEffect, useState } from "react";
import type { Product } from "../types/product";
//import type { Product } from "../types/product";

const HomePage = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const { fetchProducts, products } = useProductStore();

  const fetchProductsData = useCallback(async () => {
    setIsLoading(true)
    await fetchProducts();
    setIsLoading(false)
  }, [fetchProducts])

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  console.log(products);
  return (
    <Container
      maxW="1200px"
      mt={10}
      p={4}
    >
      {
        isLoading ? (
          <Stack>
            <Text textAlign={'center'} fontSize={'4xl'} fontWeight={'bold'} color={"blue.500"}>
              Loading...
            </Text>
          </Stack>
        ) : 
        products.length == 0 ? (
          <Stack>
            <Text textAlign={'center'} fontSize={'3xl'} fontWeight={'bold'} color={"blue.500"}>
              Current Products
            </Text>
            <Text textAlign={'center'} fontSize={'xl'}>
              No products Found 😢 {" "}
              <Link to={'/create'}>
                <Text as='span' color={"blue.500"} _hover={{ textDecoration: "underline" }}>
                  Create Product
                </Text>
              </Link>
            </Text>
          </Stack>
        ) : 
          <Stack>
            <Text textAlign={'center'} marginBottom={10} fontSize={'3xl'} fontWeight={'bold'} color={"blue.500"}>
              Current Products
            </Text>
            <SimpleGrid columns={[2, null, 3]} gap="40px">
              { products.map((product: Product)=>{
                return (
                  <ProductCard key={product.id} product={product}/>
                )
              })}
            </SimpleGrid>
          </Stack>
      }
    </Container>
  );
};

export default HomePage;
