const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
describe("Lock", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {
        const Lock = await ethers.getContractFactory("VerifySignature");
        const lock = await Lock.deploy();

        return lock
    }

    describe("Deployment", function () {
        it("Should set the right unlockTime", async function () {
            const lock = await deployOneYearLockFixture()

            const x = await lock.verify(
                ethers.utils.getAddress("0x0cbFDc7a44E2618141Afa9A3D55A783cf0f07B4d"),
                ethers.utils.hexZeroPad("0xf90e4e3ff67b354bfb8642ae3015d7dedac550905052e93b443d21c4c126d625",32),
                ethers.utils.hexZeroPad("0x184cf1164667f5dad2cab5cc6762b63658e82ad437ca1ef8aea66cc8113560a1",32),
                28,
                ["Test", 1])
            const xx = await x.wait()
            console.log(xx)
        });

        //   it("Should set the right owner", async function () {
        //     const { lock, owner } = await loadFixture(deployOneYearLockFixture);

        //     expect(await lock.owner()).to.equal(owner.address);
        //   });

        //   it("Should receive and store the funds to lock", async function () {
        //     const { lock, lockedAmount } = await loadFixture(
        //       deployOneYearLockFixture
        //     );

        //     expect(await ethers.provider.getBalance(lock.address)).to.equal(
        //       lockedAmount
        //     );
        //   });

        //   it("Should fail if the unlockTime is not in the future", async function () {
        //     // We don't use the fixture here because we want a different deployment
        //     const latestTime = await time.latest();
        //     const Lock = await ethers.getContractFactory("Lock");
        //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
        //       "Unlock time should be in the future"
        //     );
        //   });
    });

});
