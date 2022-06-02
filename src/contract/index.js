import { ethers } from "ethers";

import DAI_ABI from "./abi.json";

const supportChainId = 97;
const DAI_Address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const RPCS = {
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
};

const providers = {
    97: new ethers.providers.JsonRpcProvider(RPCS[97]),
};

const DAIContract = new ethers.Contract(
    DAI_Address,
    DAI_ABI,
    providers[supportChainId]
);

export { providers, DAIContract, supportChainId };
