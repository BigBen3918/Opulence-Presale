import React, { useEffect, useState, useRef } from "react";
import {
    Image,
    Container,
    HStack,
    Text,
    Flex,
    Spacer,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { FaTwitter, FaDiscord, FaGithub, FaArrowRight } from "react-icons/fa";
import { Squash as Hamburger } from "hamburger-react";

import logo from "../../assets/images/logo.png";

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef(null);
    const [mobileView, setMobileView] = useState(false);

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 767
                ? setMobileView(true)
                : setMobileView(false);
        };

        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    });

    return (
        <>
            <Container maxW="1104px">
                <Flex>
                    <Box paddingTop="1rem">
                        <HStack>
                            <a href="#" style={{ paddingRight: "20px" }}>
                                <Image src={logo} boxSize="32px" />
                            </a>
                            {mobileView ? (
                                ""
                            ) : (
                                <HStack className="menu">
                                    <a href="#">
                                        <HStack padding={"10px"}>
                                            <FaDiscord />
                                            <Text fontSize="md">Discord</Text>
                                        </HStack>
                                    </a>
                                    <a href="#">
                                        <HStack padding={"10px"}>
                                            <FaTwitter />
                                            <Text fontSize="md">Twitter</Text>
                                        </HStack>
                                    </a>
                                    <a href="#">
                                        <HStack padding={"10px"}>
                                            <FaGithub />
                                            <Text fontSize="md">Github</Text>
                                        </HStack>
                                    </a>
                                </HStack>
                            )}
                        </HStack>
                    </Box>
                    <Spacer />
                    <Box p="4">
                        <HStack>
                            <ColorModeSwitcher justifySelf="flex-end" />
                            {mobileView ? (
                                <button ref={btnRef} onClick={onOpen}>
                                    <Hamburger
                                        size={25}
                                        rounded
                                        toggled={isOpen}
                                    />
                                </button>
                            ) : (
                                <Button colorScheme="teal">
                                    Go Home&nbsp;
                                    <FaArrowRight />
                                </Button>
                            )}
                        </HStack>
                    </Box>
                </Flex>
            </Container>

            {/* Menu */}
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <Image src={logo} boxSize={"32px"} />
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack alignItems={"left"} className="menu">
                            <a href="#">
                                <HStack padding={"10px"}>
                                    <FaDiscord />
                                    <Text fontSize="md">Discord</Text>
                                </HStack>
                            </a>
                            <a href="#">
                                <HStack padding={"10px"}>
                                    <FaTwitter />
                                    <Text fontSize="md">Twitter</Text>
                                </HStack>
                            </a>
                            <a href="#">
                                <HStack padding={"10px"}>
                                    <FaGithub />
                                    <Text fontSize="md">Github</Text>
                                </HStack>
                            </a>
                        </VStack>
                        <br />
                        <VStack align="stretch">
                            <Button colorScheme="teal">Launch App</Button>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
