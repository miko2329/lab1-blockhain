import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
const artifactPromise = await fetch("./artifacts/contracts/HelloWorld.sol/HelloWorld.json")
const artifact = await artifactPromise.json()


const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

const helloButton = document.getElementById("hello-world")
const newMessageInput = document.getElementById("new-message")
const newMessageBtn = document.getElementById("new-message-btn")

async function testSmart() {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
        console.log("window.ethereum exists");
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.BrowserProvider(window.ethereum)

        const signer = await provider.getSigner()

        const contract = new ethers.Contract(contractAddress, artifact.abi, signer)

        helloButton.addEventListener("click", async () => {
            const result = await contract.getMessage()

            alert(`Message: ${result}`)
        })

        newMessageBtn.addEventListener("click", async () => {
            const newMsg = newMessageInput.value

            const tx = await contract.setMessage(newMsg)
            await tx.wait()

            alert(`Message updated to: ${newMsg}`)
        })
    }
}

testSmart()