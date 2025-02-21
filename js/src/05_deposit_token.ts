import {Provider, types, Wallet} from "zksync2-js";
import {ethers} from "ethers";

const provider = Provider.getDefaultProvider(types.Network.Goerli);
const ethProvider = ethers.getDefaultProvider("goerli");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const wallet = new Wallet(PRIVATE_KEY, provider, ethProvider);



async function main() {
    // Crown token which can be mint for free
    const tokenL1 = "0xc8F8cE6491227a6a2Ab92e67a64011a4Eba1C6CF";
    const tokenL2 = await provider.l2TokenAddress(tokenL1);

    console.log(`L2 balance before deposit: ${await wallet.getBalance(tokenL2)}`);
    console.log(`L1 balance before deposit: ${await wallet.getBalanceL1(tokenL1)}`);

    const tx = await wallet.deposit({
        token: tokenL1,
        to: await wallet.getAddress(),
        amount: 5,
        approveERC20: true,
        refundRecipient: await wallet.getAddress()
    });
    const receipt =  await tx.wait();
    console.log(`Tx: ${receipt.hash}`);

    console.log(`L2 balance after deposit: ${await wallet.getBalance(tokenL2)}`);
    console.log(`L1 balance after deposit: ${await wallet.getBalanceL1(tokenL1)}`);

}

main().then().catch(error => {
    console.log(`Error: ${error}`);
})