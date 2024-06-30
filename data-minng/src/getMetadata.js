import pkg from "@zoralabs/zdk";
const { ZDK, ZDKNetwork, ZDKChain } = pkg;

import { Strategies, Networks } from "@zoralabs/nft-hooks";
import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";

dotenv.config();

const networkInfo = {
    network: ZDKNetwork.Base,
    chain: ZDKChain.BaseMainnet,
};

const API_ENDPOINT = "https://api.zora.co/graphql";
const args = {
    endPoint: API_ENDPOINT,
    networks: [networkInfo],
    apiKey: process.env.API_KEY,
};

const zdk = new ZDK(args);

const parseContracts = () => {
    return new Promise((resolve, reject) => {
        const contracts = [];
        fs.createReadStream("contracts.csv")
            .pipe(csv())
            .on("data", (data) => contracts.push(data.address))
            .on("end", () => resolve(contracts))
            .on("error", (error) => reject(error));
    });
};

const fetchNFTData = async (contractAddress) => {
    const collection = await zdk.collection({ address: contractAddress });
    const collectionStats = await zdk.collectionStatsAggregate({ collectionAddress: contractAddress });
    const fetchAgent = new Strategies.ZDKFetchStrategy(Networks.MAINNET);
    const nft = await fetchAgent.fetchNFT(contractAddress, "1"); // Assuming we're fetching the first NFT

    return {
        collection,
        collectionStats,
        nft,
    };
};

const main = async () => {
    try {
        const contracts = await parseContracts();
        const results = [];

        for (const contract of contracts) {
            const result = await fetchNFTData(contract);
            results.push(result);
        }

        fs.writeFileSync("nft_data.json", JSON.stringify(results, null, 2));
        console.log("NFT data has been saved to nft_data.json");
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

main();
