import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import roboPunksNFT from './RoboPunksNFT.json';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const roboPunksNFTAddress = "0x4b53E3cE1BDeae76aCC2B2f19d710C1EBa656e99";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            roboPunksNFTAddress,
            roboPunksNFT.abi,
            signer,
        );
        try {
            const response = await contract.mint(BigNumber.from(mintAmount), {
            value: ethers.utils.parseEther((0.02 * mintAmount).toString())});
            console.log('response: ', response);
        } catch (err) {
            console.log("error: ", err)
        }
      }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return(
        <div>
            <h1>RoboPunks</h1>
            <p>Its 2050. Can RoboPunks NFT save humans from various money-making scams? Mint RoboPunks to find out.</p>
            {isConnected ? (
                <div>
                    <Flex align="center" justify="center">
                        <Button 
                            backgroundColor="#D6517D"
                            fontFamily="inherit"
                            cursor="pointer"
                            color="white"
                            padding="15px"
                            marginTop="10px"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            onClick={handleDecrement}>-</Button>

                        <input 
                            readOnly
                            type="number" value={mintAmount} />

                        <Button 
                            backgroundColor="#D6517D"
                            fontFamily="inherit"
                            cursor="pointer"
                            color="white"
                            padding="15px"
                            marginTop="10px"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            onClick={handleIncrement}>+</Button>
                    </Flex>
                    <Button
                        backgroundColor="#D6517D"
                        fontFamily="inherit"
                        cursor="pointer"
                        color="white"
                        padding="15px"
                        marginTop="10px"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        onClick={handleMint}>Mint Now</Button>
                </div>
            ) : (
                <p>You must be connected to Mint.</p>
            )}
        </div>
    );


};

export default MainMint;