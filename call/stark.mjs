import {Provider, Contract, Account, ec, number} from 'starknet';
const provider = new Provider({ sequencer: { baseUrl:"https://alpha-mainnet.starknet.io"  } });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const main = async () => {
    // output chainId
    console.log("Chain ID: ", await provider.getChainId());
    // read contract 
    const testAddress = "0x060cf64cf9edfc1b16ec903cee31a2c21680ee02fc778225dacee578c303806a";
    // Read ABI from contract address
    console.log("provider",provider)
    const { abi: testAbi } = await provider.getClassAt(testAddress);
    // create contract instance
    const myTestContract = new Contract(testAbi, testAddress, provider);
    // Write contract
    const privateKey = "私钥";
    const accountAddr = "地址";


    const account = new Account(provider, accountAddr, privateKey);
    // Connect account with the contract
    myTestContract.connect(account);
    // or you can use invoke
    for (let index = 0; index < 1;) {
      console.log("开始循环");
      try {

        const executeHash = await account.execute(
          {
            contractAddress: testAddress,
            entrypoint: 'mint'
          }
        );
        console.log(executeHash);
        await provider.waitForTransaction(executeHash.transaction_hash);

        
        // const bal1 = await myTestContract.call("symbol");
        // console.log("Initial balance =", bal1.toString());

        // const result = await myTestContract.invoke("mint");
        
        // const txReceiptDeployTest = await provider.waitForTransaction(result.transaction_hash);
        // console.log("hash", txReceiptDeployTest);
        // const events = txReceiptDeployTest.events;
        // const event = events.find(
        //     (it) => number.cleanHex(it.from_address) === number.cleanHex(testAddress)
        //   ) || {data: []};
        // console.log("event: ", event);
        await sleep(15*60*1000);
      } catch (error) {
        // 处理异常的代码
        console.error('Error:', error.errorCode);
      }
      console.log("结束循环");
    }

}
main()