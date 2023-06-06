import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { addCharacter, updateCharacterInfo } from "moralisIntegration";
import { setPlayerContract, setWagesContract } from "redux/actions";
import { store } from "redux/store";
import playerAbi from "./playerAbi.json";
import wageAbi from "./wageAbi.json";

let playerContract, wagesContract, priceContract, registryContract;

export const connectContracts = (signer) => {
  // const priceAbi = [];
  // const registryAbi = [];

  playerContract = new Contract(
    "0xE8F4d23aB2c59382f5A49CBBfE5668aFa33dF1a2",
    playerAbi,
    signer
  );
  wagesContract = new Contract(
    "0xB537cBFbbBC3b0Dd4C5994460f13A466f0CF363B",
    wageAbi,
    signer
  );
  // priceContract = new Contract(
  //   "0x06502A1b2cC2417f05485EC4dFc7D8eCF0b944e7",
  //   priceAbi,
  //   signer
  // );
  // registryContract = new Contract(
  //   "0xE034714bdd3176D7C7f3b4Dc931e0867309589e6",
  //   registryAbi,
  //   signer
  // );

  // playerContract.on("playerBought", (tokenId, buyer, Info) => {
  //   addCharacter(Info.name, tokenId.toString());
  // });

  store.dispatch(setPlayerContract(playerContract));
  store.dispatch(setWagesContract(wagesContract));

  wagesContract.on("SalaryRetrieved", (user, tokenId, amount) => {
    updateCharacterInfo({ token: tokenId, lastSalary: new Date() });
  });
};

/** Player methods */

export const approve = (toAddress, tokenId) => {
  try {
    const res = playerContract.approve(toAddress, tokenId);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const balanceOf = async (address) => {
  try {
    const res = await playerContract.balanceOf(address).then((res) => {
      return parseInt(res.toString());
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const feedCharacter = (tokenId) => {
  try {
    const res = playerContract.feedCharacter(tokenId);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const getApproved = (tokenId) => {
  try {
    playerContract.getApproved(tokenId).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPlayerInfo = (tokenId) => {
  try {
    const res = playerContract.getPlayerInfo(tokenId).then((res) => res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTokensMinted = () => {
  try {
    playerContract.getTokensMinted().then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const hospital = (tokenId) => {
  try {
    const res = playerContract.hospital(tokenId);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const isApprovedForAll = (owner, operator) => {
  try {
    playerContract.isApprovedForAll(owner, operator).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const mate = (tokenId, partnerTokenId) => {
  try {
    playerContract.mate(tokenId, partnerTokenId).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const mint = async (isMale, tetheredToken, name) => {
  try {
    const tx = await playerContract.mint(isMale, tetheredToken, {
      value: Math.pow(10, 18).toString(),
    });
    const receipt = await tx.wait();
    addCharacter(name, receipt.events[0].args[2].toString());
  } catch (error) {
    console.log(error);
  }
};

export const name = () => {
  try {
    playerContract.name().then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};
export const owner = () => {
  try {
    playerContract.owner().then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const ownerOf = (tokenId) => {
  try {
    playerContract.ownerOf(tokenId).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const renounceOwnership = () => {
  try {
    const res = playerContract.renounceOwnership();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const safeTransferFrom = (from, to, tokenId) => {
  try {
    const res = playerContract.safeTransferFrom(from, to, tokenId);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const setApprovalForAll = (operator, approved) => {
  try {
    playerContract.setApprovalForAll(operator, approved).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const supportsInterface = (interfaceId) => {
  try {
    playerContract.supportsInterface(interfaceId).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const symbol = () => {
  try {
    playerContract.symbol().then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const tokenByIndex = (index) => {
  try {
    playerContract.tokenByIndex(index).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const tokenOfOwnerByIndex = async (owner, index) => {
  try {
    const res = await playerContract
      .tokenOfOwnerByIndex(owner, index)
      .then((res) => {
        return res;
      });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const tokenUri = async (tokenId) => {
  try {
    const res = await playerContract.tokenURI(tokenId).then((res) => res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const totalSupply = () => {
  try {
    playerContract.totalSupply().then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const transferFrom = (from, to, tokenId) => {
  try {
    const res = playerContract.transferFrom(from, to, tokenId);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const transferOwnership = (newOwner) => {
  try {
    const res = playerContract.transferOwnership(newOwner);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

/** wage methods */

export const allowance = (owner, spender) => {
  try {
    wagesContract.allowance(owner, spender).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const approveSpend = (spender, value) => {
  try {
    const res = wagesContract.approve(spender, value);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const balanceOfAccount = (account) => {
  try {
    wagesContract.balanceOf(account).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const burn = (amount) => {
  try {
    const res = wagesContract.burn(amount);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const burnFrom = (account, amount) => {
  try {
    const res = wagesContract.burnFrom(account, amount);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const decimals = () => {
  try {
    wagesContract.decimals().then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const decreaseAllowance = (spender, subtractedValue) => {
  try {
    const res = wagesContract.decreaseAllowance(spender, subtractedValue);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const increaseAllowance = (spender, addedValue) => {
  try {
    const res = wagesContract.increaseAllowance(spender, addedValue);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const wageName = () => {
  try {
    wagesContract.name().then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const wageOwner = () => {
  try {
    wagesContract.owner().then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const payWage = (tokenId) => {
  try {
    wagesContract.payWage(tokenId).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const transfer = (recipient, amount) => {
  try {
    const res = wagesContract.transfer(recipient, amount);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const wageTransferFrom = (sender, recipient, amount) => {
  try {
    const res = wagesContract.transferFrom(sender, recipient, amount);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const wageTransferOwnership = (newOwner) => {
  try {
    const res = wagesContract.transferOwnership(newOwner);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
