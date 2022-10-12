const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = "250000000000000000"
const GAS_PRICE_LINK = 1e9
const DECIMALS = "18"
const INITIAL_ANSWER = ethers.utils.parseUnits("2000", "ether")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (developmentChains.includes(network.name)) {
        log("Local Network Detected!! Deploying Mocks...")

        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: [BASE_FEE, GAS_PRICE_LINK],
            blockConfirmations: network.config.blockConfirmations || 1,
        })

        await deploy("MockV3Aggregator", {
            from: deployer,
            args: [DECIMALS, INITIAL_ANSWER],
            log: true,
            blockConfirmations: network.config.blockConfirmations,
        })

        log("Mocks Deployed...")
    }
}

module.exports.tags = ["all", "mocks", "main"]
