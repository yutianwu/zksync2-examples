import {Provider, types} from "zksync2-js";

const provider = Provider.getDefaultProvider(types.Network.Goerli);

function toJSON(object: any): string {
    return JSON.stringify(object, (key, value) => {
        if (typeof value === 'bigint') {
            return value.toString(); // Convert BigInt to string
        }
        return value;
    });
}

async function main() {
    console.log(`Confirmed tokens: ${toJSON(await provider.getConfirmedTokens())}`);
}

main().then().catch(error => {
    console.log(`Error: ${error}`);
})