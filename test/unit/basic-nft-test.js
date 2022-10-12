const { assert } = require("chai")
const { deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Test", function () {
          let basicNft
          beforeEach(async () => {
              await deployments.fixture(["basicnft"])
              basicNft = await ethers.getContract("BasicNft")
          })
          describe("Constructor", function () {
              it("Should Initialise the NFT properly", async () => {
                  const name = await basicNft.name()
                  const symbol = await basicNft.symbol()
                  const tokenCounter = await basicNft.getTokenCounter()
                  assert.equal(name, "Doggie")
                  assert.equal(symbol, "DOG")
                  assert.equal(tokenCounter.toString(), "0")
              })
          })
          describe("mintNft", function () {
              it("Should Mint NFT and set the vars right", async () => {
                  const tokenURI = await basicNft.tokenURI(0)
                  await basicNft.mintNft()
                  const tokenCounter = await basicNft.getTokenCounter()
                  assert.equal(tokenURI, await basicNft.TOKEN_URI())
                  assert.equal(tokenCounter.toString(), "1")
              })
          })
      })
