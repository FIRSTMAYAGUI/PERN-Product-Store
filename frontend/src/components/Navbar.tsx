import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <Container maxW={'1200px'} px={4}>
        <Flex
            flexDir={{ base: 'column', sm: 'row' }}
            h={16}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <Text
                fontSize={{ base:'22', sm: '28'}}
                fontWeight={'bold'}
                textAlign={'center'}
                textTransform={'uppercase'}
                bgClip={'text'}
                color={'blue.500'}
            >
                <Link to={'/'}>Product Store</Link>
            </Text>
            <HStack>
                <Link to={'/create'}>
                    <Button variant={'subtle'} colorPalette={"blue"} color={"black"}>
                        <Plus color="black"/>
                        Create Product
                    </Button>
                </Link>
            </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar
