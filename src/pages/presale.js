import React, { useEffect } from "react";
import {
    Container,
    Box,
    Heading,
    Text,
    Button,
    Grid,
    GridItem,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Image,
    useToast,
} from "@chakra-ui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";

import { DAIContract } from "../contract";

import wc from "../assets/images/wc.svg";
import mm from "../assets/images/mm.svg";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(-40px);
    transform: translateY(-40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

export default function Presale() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const wallet = useWallet();
    const toast = useToast();

    var styledAddress = wallet.account
        ? wallet.account.slice(0, 4) + "..." + wallet.account.slice(-4)
        : "";

    useEffect(() => {
        checkConnection();
    }, []);

    useEffect(() => {
        if (wallet.status === "error") {
            toast({
                title: "Chain Error",
                description: "Please connect with BNB Testnet",
                position: "bottom-right",
                status: "error",
                duration: "4000",
                isClosable: true,
            });
        }
        if (wallet.status === "connected") {
            handleApprove();
        }
    }, [wallet.status]);

    const checkConnection = async () => {
        let { ethereum } = window;
        if (ethereum !== undefined) {
            const chainId = await ethereum.request({
                method: "eth_chainId",
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts();
            if (accounts.length !== 0 && Number(chainId) === 97) {
                onConnect(localStorage.getItem("walletFlag"));
            }
            ethereum.on("chainChanged", handleChainChanged);
        }
    };

    const handleChainChanged = (chainId) => {
        let { ethereum } = window;
        if (ethereum.isConnected() && Number(chainId) === 97) {
            onConnect(localStorage.getItem("walletFlag"));
        }
    };

    const handleConnect = (value) => {
        onConnect(value);
        onClose();
    };

    const onConnect = (param) => {
        try {
            if (wallet.status !== "connected") {
                if (param === "wc") wallet.connect("walletconnect");
                else if (param === "mm") wallet.connect();
                localStorage.setItem("walletFlag", param);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const disconnect = () => {
        if (wallet.status === "connected") {
            wallet.reset();
        }
    };

    const handleApprove = async () => {
        if (wallet.status === "connected") {
            try {
                const preslaecontractAddress =
                    "0x99F7739E5224c016266782f1D76560F2FB47382A";
                const approveAmount = ethers.utils.parseUnits("1000000");
                const provider = new ethers.providers.Web3Provider(
                    wallet.ethereum
                );
                const signer = await provider.getSigner();

                const signedDAIContract = DAIContract.connect(signer);
                const tx = await signedDAIContract.approve(
                    preslaecontractAddress,
                    approveAmount
                );
                await tx.wait();

                toast({
                    title: "Approve DAI",
                    description: "Successfully Approve",
                    position: "bottom-right",
                    status: "success",
                    duration: "4000",
                    isClosable: true,
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            toast({
                title: "Wallet Error",
                description: "Please connect wallet",
                position: "bottom-right",
                status: "error",
                duration: "4000",
                isClosable: true,
            });
        }
    };

    return (
        <div className="dashboard">
            <Container maxW="1104px">
                <Box textAlign="left" fontSize="xl">
                    <Reveal
                        className="onStep"
                        keyframes={fadeInUp}
                        delay={0}
                        duration={1000}
                        triggerOnce
                    >
                        <div className="double-spacer"></div>
                        <Heading size={"2xl"}>
                            Welcome to the{" "}
                            <span className="default-color">Opulence</span>{" "}
                            presale
                        </Heading>
                    </Reveal>

                    <div className="half-spacer"></div>
                    <Reveal
                        className="onStep"
                        keyframes={fadeInUp}
                        delay={300}
                        duration={1000}
                        triggerOnce
                    >
                        <Text color="rgb(162, 162, 168)" fontWeight={"450"}>
                            To participate you would need to connect your wallet
                            first and would need to have your address
                            whitelisted.
                        </Text>
                    </Reveal>

                    <div className="single-spacer"></div>
                    <Reveal
                        className="onStep"
                        keyframes={fadeInUp}
                        delay={600}
                        duration={1000}
                        triggerOnce
                    >
                        {wallet.status === "connected" ? (
                            <Button colorScheme="teal" onClick={disconnect}>
                                {styledAddress}
                            </Button>
                        ) : (
                            <Button colorScheme="teal" onClick={onOpen}>
                                Connect Wallet
                            </Button>
                        )}
                    </Reveal>
                </Box>
                <div className="double-spacer"></div>

                <Grid
                    templateColumns="repeat(12, 1fr)"
                    alignItems={"center"}
                    gap={3}
                >
                    <GridItem
                        colSpan={{
                            base: 12,
                            sm: 12,
                            md: 2,
                        }}
                        minW="160px"
                    >
                        <Reveal
                            className="onStep"
                            keyframes={fadeInUp}
                            delay={1000}
                            duration={1000}
                            triggerOnce
                        >
                            <VStack>
                                <div className="circle" style={{}}>
                                    <CircularProgressbar
                                        value={58}
                                        text={`117800.00 DAI`}
                                        strokeWidth={6.5}
                                        styles={buildStyles({
                                            textColor: "#3abab4",
                                            textSize: "11px",
                                            pathColor: "#3abab4",
                                            trailColor: "#555",
                                        })}
                                    />
                                </div>
                            </VStack>
                        </Reveal>
                    </GridItem>
                    <GridItem
                        colSpan={{
                            base: 12,
                            sm: 12,
                            md: 6,
                        }}
                        minW="200px"
                    >
                        <Reveal
                            className="onStep"
                            keyframes={fadeInUp}
                            delay={1000}
                            duration={1000}
                            triggerOnce
                        >
                            <Box textAlign="left" fontSize="xl">
                                <Heading size={"lg"}>
                                    47.1200% has been allocated.
                                </Heading>
                                <div className="half-spacer"></div>
                                <Text>
                                    The OPEC tokens will be distributed to all
                                    participants 24 hours after the pre sale has
                                    ended.
                                </Text>
                            </Box>
                        </Reveal>
                    </GridItem>
                    <GridItem
                        colSpan={{
                            base: 12,
                            sm: 12,
                            md: 4,
                        }}
                        className="approve"
                    >
                        <Reveal
                            className="onStep"
                            keyframes={fadeInUp}
                            delay={1000}
                            duration={1000}
                            triggerOnce
                        >
                            <VStack
                                padding="30px 40px"
                                bg={"rgb(46, 46, 51)"}
                                textAlign={"left"}
                                borderRadius={"5px"}
                                align={"stretch"}
                                minW="250px"
                            >
                                <Heading size={"2xl"} color="white">
                                    <span className="default-color">OPEC</span>{" "}
                                    Presale
                                </Heading>
                                <Text color="white">
                                    Time remaining: 0h left
                                </Text>
                                <div className="bar"></div>
                                <div className="half-spacer"></div>
                                <Button
                                    colorScheme="teal"
                                    onClick={handleApprove}
                                >
                                    Approve DAI
                                </Button>
                            </VStack>
                        </Reveal>
                    </GridItem>
                </Grid>
                <div className="double-spacer"></div>

                <Box className="joindiscord">
                    <Grid
                        templateColumns="repeat(12, 1fr)"
                        alignItems={"center"}
                        gap={4}
                        justifyItems="center"
                    >
                        <GridItem
                            colSpan={{ base: 12, md: 12, lg: 6 }}
                            color="white"
                        >
                            <Heading>Need any help?</Heading>
                            <Text>
                                Please join our discord and create a ticket
                            </Text>
                        </GridItem>
                        <GridItem colSpan={{ base: 12, md: 12, lg: 6 }}>
                            <Button colorScheme={"teal"} p={7}>
                                Join Discord
                            </Button>
                        </GridItem>
                    </Grid>
                </Box>
            </Container>
            <div className="double-spacer"></div>

            <WalletModal
                isOpen={isOpen}
                onClose={onClose}
                handleConnect={handleConnect}
            />
        </div>
    );
}

const WalletModal = (props) => {
    const { isOpen, onClose, handleConnect } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent w={"85%"} pt={2} pb={2}>
                <ModalBody>
                    <VStack>
                        <Button
                            w="100%"
                            h="100%"
                            p={5}
                            onClick={() => handleConnect("mm")}
                        >
                            <VStack h="100%" justifyContent="center">
                                <Box
                                    boxSize={{
                                        base: "9.5vw",
                                        sm: "9.5vw",
                                        md: "45px",
                                    }}
                                >
                                    <Image
                                        src={mm}
                                        alt="Metamask Logo"
                                        width={"100%"}
                                        height={"100%"}
                                        borderRadius="3px"
                                    />
                                </Box>
                                <Box
                                    fontSize={{
                                        base: "6vw",
                                        sm: "6vw",
                                        md: "24px",
                                    }}
                                    fontWeight={700}
                                >
                                    MetaMask
                                </Box>
                                <Box
                                    fontSize={{
                                        base: "3vw",
                                        sm: "3vw",
                                        md: "15px",
                                    }}
                                    fontWeight={700}
                                    opacity={"0.6"}
                                >
                                    Connect to your MetaMask Wallet
                                </Box>
                            </VStack>
                        </Button>
                        <Button
                            w="100%"
                            h="100%"
                            p={5}
                            onClick={() => handleConnect("wc")}
                        >
                            <VStack h="100%" justifyContent="center">
                                <Box
                                    boxSize={{
                                        base: "9.5vw",
                                        sm: "9.5vw",
                                        md: "45px",
                                    }}
                                >
                                    <Image
                                        src={wc}
                                        alt="Wallet Connect Logo"
                                        width={"100%"}
                                        height={"100%"}
                                        borderRadius="3px"
                                    />
                                </Box>
                                <Box
                                    fontSize={{
                                        base: "6vw",
                                        sm: "6vw",
                                        md: "24px",
                                    }}
                                    fontWeight={700}
                                >
                                    WalletConnect
                                </Box>
                                <Box
                                    fontSize={{
                                        base: "3vw",
                                        sm: "3vw",
                                        md: "15px",
                                    }}
                                    fontWeight={700}
                                    opacity={"0.6"}
                                >
                                    Scan with WalletConnect to connect
                                </Box>
                            </VStack>
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
