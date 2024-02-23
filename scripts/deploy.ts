// scripts/deploy.js
const hre = require("hardhat");

const main = async () => {
  // Get 'OnChainNFT' contract
  const NFTContractFactory = await hre.ethers.getContractFactory('NFT');

  // Deploy contract
  const NFTContract = await NFTContractFactory.deploy();

  console.log('✅ Contract deployed to:', NFTContract.target);

  // SVG image that you want to mint
  const svg = `<svg width="400px" height="400px" viewBox="-10 -5 1034 1034" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
  <path fill="#000000"
d="M497 177q-95 1 -179.5 41.5t-144.5 111.5q-62 75 -85 169q-28 112 4 222q31 107 111 185q82 80 194 108t222 -4q107 -32 185 -111q80 -82 108 -194t-4 -223q-32 -106 -111 -184q-82 -81 -194 -108q-53 -14 -106 -13zM483 325l46 12l-19 75l38 8l18 -74l47 11l-19 77
q49 17 72 40q27 28 21 67q-8 57 -59 69q33 17 44 43q13 29 -1 70q-18 50 -62 64q-37 11 -103 -1l-19 77l-47 -12l19 -76l-37 -9l-19 76l-47 -11l20 -78l-94 -24l23 -53l17 5q17 4 17 3q15 4 21 -11l31 -122l5 1l-5 -1l21 -88q2 -21 -21 -27l-34 -8v0l12 -50l65 16h-1l30 8z
M498 467l-23 93l7 2q41 11 64 10q41 0 49 -32t-27 -51q-19 -11 -61 -20zM463 607l-26 102l9 3q50 13 77 13q49 0 58 -35t-34 -57q-23 -12 -73 -24z" />
</svg>`;

  // Call the mint function from our contract
  const txn = await NFTContract.mint(svg);
  const txnReceipt = await txn.wait();

  // Get the token id of the minted NFT (using our event)
  const event = txnReceipt.events?.find((event) => event.event === 'Minted');
  const tokenId = event?.args['tokenId'];

  console.log(
    '🎨 Your minted NFT:',
    `https://testnets.opensea.io/assets/${NFTContract.target}/${tokenId}`
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
