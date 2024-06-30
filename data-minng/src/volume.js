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

const parseNFTs = () => {
    return new Promise((resolve, reject) => {
        const nfts = [];
        fs.createReadStream("nfts.csv")
            .pipe(csv())
            .on("data", (data) => nfts.push(data))
            .on("end", () => resolve(nfts))
            .on("error", (error) => reject(error));
    });
};

const getSalesVolumeWithPagination = async (address, startDate, endDate) => {
    let hasNextPage = true;
    let endCursor = null;
    let totalVolume = BigInt(0);

    while (hasNextPage) {
        const result = await zdk.salesVolume({
            where: { collectionAddresses: [address] },
            networks: [{ chain: ZDKChain.Mainnet, network: ZDKNetwork.Ethereum }],
            timeFilter: {
                startDate,
                endDate,
            },
            pagination: {
                after: endCursor,
                limit: 100, // Adjust this value based on API limits
            },
        });

        if (result.salesVolume.nodes && result.salesVolume.nodes.length > 0) {
            for (const node of result.salesVolume.nodes) {
                totalVolume += BigInt(node.totalVolume);
            }
        }

        hasNextPage = result.salesVolume.pageInfo.hasNextPage;
        endCursor = result.salesVolume.pageInfo.endCursor;

        // Add a small delay to avoid hitting rate limits
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return totalVolume;
};

const main = async () => {
    try {
        const nfts = await parseNFTs();
        const startDate = "2023-01-01T00:00:00Z"; // Adjust as needed
        const endDate = new Date().toISOString(); // Current date

        for (const nft of nfts) {
            console.log(`Processing NFT: ${nft.name} (${nft.address})`);

            const totalVolume = await getSalesVolumeWithPagination(nft.address, startDate, endDate);

            console.log(`Total sales volume for ${nft.name}: ${totalVolume.toString()} (in wei)`);
            console.log(`Total sales volume in ETH: ${(Number(totalVolume) / 1e18).toFixed(4)} ETH`);
            console.log("---");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

main();
