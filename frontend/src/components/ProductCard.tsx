import { Box, Button, Card, CloseButton, Dialog, HStack, Image, Input, Portal, Stack, Text } from "@chakra-ui/react";
import { SquarePen, Trash2 } from "lucide-react";
import type { Product } from "../types/product";
import { useProductStore } from "../store/productStore";
import { useState } from "react";
//import UpdateFormDailog from "./UpdateFormDailog";

const ProductCard = ({ product }: {product: Product}) => {
  const [productData, setProductData] = useState<Product>(product);
  const [ isOpen, setIsOpen ] = useState(false)
  const { updateProduct, deleteProduct } = useProductStore();

  const handleUpdate = async (id: number) =>{
    console.log("updated and id is: ", id);
    const { success, message } = await updateProduct(productData, id);
    console.log("the updated product with status of: ", success);
    if(success === true) setIsOpen(false)
    alert(message);
  };

  const handleDelete = async (id: number) =>{
    console.log("deleted and id is: ", id);
    const { success, message } = await deleteProduct(id);
    console.log("the deleted product with status of: ", success);
    alert(message);
  };

  return (
    <Box
    rounded={"lg"}
    transition={"all 0.5"}
    overflow="hidden"
    _hover={{ transform: "translateY(-8px)"}}

    >
      <Card.Root maxW="sm">
        <Image
          src={product.image}
          alt="image"
        />
        <Card.Body gap="2">
          <Card.Title>{product.name}</Card.Title>
          <Card.Description>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces.
          </Card.Description>
          <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
            ${product.price}
          </Text>
        </Card.Body>
        <Card.Footer gap="2">
          {/* Dialog */}
          <Dialog.Root open={isOpen} onOpenChange={()=>setIsOpen} size={{ mdDown: "full", md: "lg" }}>
                <Dialog.Trigger asChild>
                  {/* Button that will open the dailog */}
                  <Button variant="subtle" colorPalette="blue" onClick={()=>setIsOpen(true)}>
                    <SquarePen/>
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>

                      {/* Dialog header */}
                      <Dialog.Header>
                        <Dialog.Title>Update Product</Dialog.Title>
                      </Dialog.Header>

                      {/* Dialog body */}
                      <Dialog.Body>
                        <Stack spaceY={2}>
                          <Input
                            placeholder="Product Name"
                            name="name"
                            type="text"
                            value={productData.name}
                            onChange={(e)=>setProductData({...productData, name: e.target.value})}
                          />
                          <Input
                            placeholder="The price"
                            name="price"
                            type="number"
                            value={productData.price}
                            onChange={(e)=>setProductData({...productData, price: Number(e.target.value)})}
                          />
                          <Input
                            placeholder="Imgae Url"
                            name="image"
                            type="text"
                            value={productData.image}
                            onChange={(e)=>setProductData({...productData, image: e.target.value})}
                          />
                      </Stack>
                      </Dialog.Body>

                      {/* Dialog footer */}
                      <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                          <Button variant="outline" onClick={()=>setIsOpen(false)}>Cancel</Button>
                        </Dialog.ActionTrigger>
                          <Button colorPalette="blue" onClick={()=>handleUpdate(product.id)}>Save</Button>
                      </Dialog.Footer>

                      <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" onClick={()=>setIsOpen(false)}/>
                      </Dialog.CloseTrigger>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
          </Dialog.Root>

          {/* Alerte dialog button */}
          <Dialog.Root role="alertdialog">
            <Dialog.Trigger asChild>
              {/* Delete button */}
                <Button variant="surface" colorPalette="red">
                  <Trash2/>
                </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>
                      <HStack>
                        <Text>Are you sure to delete</Text> 
                        <Text color={'gray.400'}>{product.name}</Text>
                      </HStack>
                    </Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <p>
                      This action cannot be undone. This will permanently delete the Product and remove your data from our systems.
                    </p>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button colorPalette="red" onClick={()=>handleDelete(product.id)}>Delete</Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Card.Footer>
      </Card.Root>
    </Box>
  )
}

export default ProductCard
