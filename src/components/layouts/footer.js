import React from "react";
import {
    Box,
    Container,
    Flex,
    HStack,
    Text,
    IconButton,
} from "@chakra-ui/react";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <Box className="footer">
            <Container maxW="1104px">
                <Flex className="footer_items">
                    <Box>
                        <Text>&copy; 2022 Opulence.</Text>
                    </Box>
                    <Box>
                        <Text>Dev Channel · Bug Bounty</Text>
                    </Box>
                    <Box>
                        <HStack spacing={3}>
                            <IconButton
                                colorScheme="teal"
                                size={"sm"}
                                aria-label="discord"
                                icon={<FaDiscord />}
                            />
                            <IconButton
                                colorScheme="teal"
                                size={"sm"}
                                aria-label="twitter"
                                icon={<FaTwitter />}
                            />
                            <IconButton
                                colorScheme="teal"
                                size={"sm"}
                                aria-label="github"
                                icon={<FaGithub />}
                            />
                        </HStack>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}
