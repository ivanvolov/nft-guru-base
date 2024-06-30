import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";

dotenv.config();

const API_ENDPOINT = "https://api.zora.co/graphql";

const zdk = new ZDK({
    endpoint: API_ENDPOINT,
    networks: [
        {
            chain: ZDKChain.Mainnet,
            network: ZDKNetwork.Ethereum,
        },
    ],
    apiKey: process.env.API_KEY,
});

const parseContracts = () => {
    return new Promise((resolve, reject) => {
        const contracts = [];
        fs.createReadStream("contracts.csv")
            .pipe(csv())
            .on("data", (data) => contracts.push(data))
            .on("end", () => resolve(contracts))
            .on("error", (error) => reject(error));
    });
};

const searchNFTs = async (query) => {
    const result = await zdk.search({
        query,
        filter: { entityType: "TOKEN" },
        pagination: { limit: 5 },
    });
    console.log("Search results:", result.search.nodes);
};

const getCollectionData = async (address) => {
    const result = await zdk.collection({ address });
    console.log("Collection data:", result.collection);
};

const getTokenData = async (address, tokenId) => {
    const result = await zdk.token({ token: { address, tokenId } });
    console.log("Token data:", result.token);
};

const getSalesVolume = async (address) => {
    const result = await zdk.salesVolume({
        where: { collectionAddresses: [address] },
    });
    console.log("Sales volume:", result.salesVolume);
};

const main = async () => {
    try {
        const contracts = await parseContracts();

        // Search for NFTs
        await searchNFTs("Bored Ape");

        for (const contract of contracts) {
            console.log(`\nProcessing contract: ${contract.name} (${contract.address})`);

            // Get collection data
            await getCollectionData(contract.address);

            // Get data for the first token in the collection
            await getTokenData(contract.address, "1");

            // Get sales volume for the collection
            await getSalesVolume(contract.address);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

main();
