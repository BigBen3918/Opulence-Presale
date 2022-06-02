import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { UseWalletProvider } from "use-wallet";

import Routing from "./routes";

function App() {
    return (
        <UseWalletProvider
            chainId={97}
            connectors={{
                walletconnect: {
                    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
                },
            }}
        >
            <ChakraProvider theme={theme}>
                <Routing />
            </ChakraProvider>
        </UseWalletProvider>
    );
}

export default App;
