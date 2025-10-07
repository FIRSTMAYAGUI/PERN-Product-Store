import { useState } from "react"
import type { CreateProduct } from "../types/product"
import { Box, Button, Container, Input, Stack} from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { useProductStore } from "../store/productStore"

const CreateProductPage = () => {
    const [newProduct, setNewProduct] = useState<CreateProduct>({
        name : "",
        price : 0,
        image : "",
    });

    const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct(
            {...newProduct, 
                [name] : value
            }
        )
    }

    const { createProduct } = useProductStore();

    const handleAddProduct = async () =>{
        console.log("clicked");
        const { success, message } = await createProduct(newProduct);
        console.log("success", success);
        console.log("message", message);

        //Then you reset the form
        setNewProduct({
            name : "",
            price : 0,
            image : "",
        });

        //an alert show the message
        alert(message);
    }

  return (
    <Container maxW={'xl'} py={8} mt={10} boxShadow={'md'}>
        <Stack spaceY={8}>
            <Heading as={"h1"} textAlign={'center'} size={'3xl'} color={"blue.500"}>
                Create New Product
            </Heading>
            <Box>
                <Stack spaceY={2}>
                    <Input
                        placeholder="Product Name"
                        name="name"
                        type="text"
                        value={newProduct.name}
                        onChange={setInputValue}
                    />
                    <Input
                        placeholder="The price"
                        name="price"
                        type="number"
                        value={newProduct.price}
                        onChange={setInputValue}
                    />
                    <Input
                        placeholder="Imgae Url"
                        name="image"
                        type="text"
                        value={newProduct.image}
                        onChange={setInputValue}
                    />
                </Stack>
            </Box>
            <Button colorPalette={'blue'} onClick={handleAddProduct}>Add Product</Button>
        </Stack>
    </Container>
  )
}

export default CreateProductPage
