let Token = artifacts.require('BasicToken');
let Reserve = artifacts.require('Reserve');
let Exchange = artifacts.require('Exchange');

contract('Exchange Test. Deployment No_1.', function(accounts) {
    // Reserve
    // Constructor
    it('TC1. Reserve. Constructor.', async() => {
        var reserveSWA = await Reserve.new("Jellyfishnya", "SWA", 2, { from: accounts[0] });

        var tokenAddressSWA = await reserveSWA.getTokenAddress();
        var rate = await reserveSWA.rate();
        var owner = await reserveSWA.owner();

        assert(tokenAddressSWA != "");
        assert(reserveSWA.address != "");
        assert.equal(rate, 2, "FAIL");
        assert.equal(owner, accounts[0], "FAIL");
    });

    // Setters
    it("TC2. Reserve. Function 'setRate'.", async() => {
        const initRate = 2;
        const newRate = 3;
        var reserveSWA = await Reserve.new("Jellyfishnya", "SWA", initRate, { from: accounts[0] });
        // Khu vực gọi hàm cần test và theo dõi trạng thái contract
        // Trước khi gọi function
        var actualInitRate = await reserveSWA.rate();
        assert.equal(actualInitRate, initRate, "FAIL");
        // Gọi function
        await reserveSWA.setRate(newRate, { from: accounts[0] });
        // Sau khi gọi function
        var actualNewRate = await reserveSWA.rate();
        assert.equal(actualNewRate, newRate, "FAIL");
    });

    // Other functions
    it("TC3. Reserve. Function 'buy'.", async() => {
        // Khởi tạo contracts
        const reserveSWA = await Reserve.new("Jellyfishnya", "SWA", 2, { from: accounts[0] });
        const tokenSWA = await Token.at(await reserveSWA.getTokenAddress());

        // Chuẩn bị
        const initBalance = await tokenSWA.balanceOf(accounts[1]);
        // Gọi function
        await reserveSWA.buy({ from: accounts[1], value: web3.utils.toWei("1", 'ether') });
        // Sau khi gọi function
        const newBalance = await tokenSWA.balanceOf(accounts[1]);

        assert.equal(newBalance, (initBalance * 1 + web3.utils.toWei("2", 'ether') * 1), "FAIL");
    });

    it("TC4. Reserve. Functions 'sell'.", async() => {
        // Khởi tạo contracts
        const reserveSWA = await Reserve.new("Jellyfishnya", "SWA", 2, { from: accounts[0] });
        const tokenSWA = await Token.at(await reserveSWA.getTokenAddress());

        // Chuẩn bị
        await reserveSWA.buy({ from: accounts[1], value: web3.utils.toWei("1", 'ether') });

        const initBalance = await tokenSWA.balanceOf(accounts[1]);
        // Gọi function
        await tokenSWA.approve(reserveSWA.address, web3.utils.toWei("2", 'ether'), { from: accounts[1] });

        const sellAmount = web3.utils.toWei("1", 'ether');
        await reserveSWA.sell(sellAmount, { from: accounts[1] });
        // Sau khi gọi function
        const newBalance = await tokenSWA.balanceOf(accounts[1]);

        assert.equal(newBalance, initBalance * 1 - sellAmount * 1, "FAIL");
    });

    // Exchange
    // Constructor
    it('TC5. Exchange. Constructor.', async() => {
        var exchange = await Exchange.new({ from: accounts[0] });
        assert(exchange.address != "");
    });

    it("TC6. Exchange. Function 'addReserve' and 'getListOfSupportedTokens'.", async() => {
        // Khởi tạo contracts
        const reserveSWA = await Reserve.new("Jellyfishnya", "SWA", 2, { from: accounts[0] });
        const tokenSWA = await Token.at(await reserveSWA.getTokenAddress());

        const reserveME = await Reserve.new("Meee", "ME", 1, { from: accounts[0] });
        const tokenME = await Token.at(await reserveME.getTokenAddress());

        var exchange = await Exchange.new({ from: accounts[0] });

        // Kết nối contracts
        await exchange.addReserve(reserveSWA.address, { from: accounts[0] });
        await exchange.addReserve(reserveME.address, { from: accounts[0] });

        var listSupportedTokens = await exchange.getListOfSupportedTokens();
        assert.equal(listSupportedTokens[0], tokenSWA.address, "FAIL");
        assert.equal(listSupportedTokens[1], tokenME.address, "FAIL");
    });

    it("TC7. Exchange. Function 'removeReserve'.", async() => {
        // Khởi tạo contracts
        const reserveSWA = await Reserve.new("Jellyfishnya", "SWA", 2, { from: accounts[0] });
        const tokenSWA = await Token.at(await reserveSWA.getTokenAddress());

        const reserveME = await Reserve.new("Meee", "ME", 1, { from: accounts[0] });
        const tokenME = await Token.at(await reserveME.getTokenAddress());

        var exchange = await Exchange.new({ from: accounts[0] });

        // Kết nối contracts
        await exchange.addReserve(reserveSWA.address, { from: accounts[0] });
        await exchange.addReserve(reserveME.address, { from: accounts[0] });

        await exchange.removeReserve(tokenSWA.address);

        var listSupportedTokens = await exchange.getListOfSupportedTokens();


        assert.equal(listSupportedTokens.length, 1, "FAIL");
        assert.equal(listSupportedTokens[0], tokenME.address, "FAIL");
    });

    it("TC8. Exchange. Function 'getExchangeRate'.", async() => {
        // Khởi tạo contracts
        const reserveSWA = await Reserve.new("Jellyfishnya", "SWA", 2, { from: accounts[0] });
        const tokenSWA = await Token.at(await reserveSWA.getTokenAddress());

        const reserveME = await Reserve.new("Meee", "ME", 1, { from: accounts[0] });
        const tokenME = await Token.at(await reserveME.getTokenAddress());

        var exchange = await Exchange.new({ from: accounts[0] });

        // Kết nối contracts
        await exchange.addReserve(reserveSWA.address, { from: accounts[0] });
        await exchange.addReserve(reserveME.address, { from: accounts[0] });

        // Chuẩn bị
        var receivedAmount = await exchange.getExchangeRate(tokenME.address, tokenSWA.address, "1");
        assert.equal(receivedAmount, 2, "FAIL");
    });

    it("TC9. Exchange. Function 'buyToken'.", async() => {
        // Khởi tạo contracts
        const reserveSWA = await Reserve.new("Jellyfishnya", "SWA", 2, { from: accounts[0] });
        const tokenSWA = await Token.at(await reserveSWA.getTokenAddress());

        const reserveME = await Reserve.new("Meee", "ME", 1, { from: accounts[0] });
        const tokenME = await Token.at(await reserveME.getTokenAddress());

        var exchange = await Exchange.new({ from: accounts[0] });

        // Kết nối contracts
        await exchange.addReserve(reserveSWA.address, { from: accounts[0] });
        await exchange.addReserve(reserveME.address, { from: accounts[0] });

        // Chuẩn bị
        const initBalance = await tokenME.balanceOf(exchange.address);
        await exchange.buyToken(tokenME.address, { from: accounts[0], value: web3.utils.toWei("5", 'ether') });
        const newBalance = await tokenME.balanceOf(exchange.address);

        assert.equal(newBalance, initBalance * 1 + web3.utils.toWei("5", 'ether') * 1, "FAIL");
    });

    it("TC10. Exchange. Function 'exchangeEthToToken'.", async() => {
        // Khởi tạo contracts
        const reserveSWA = await Reserve.new("Jellyfishnya", "SWA", 2, { from: accounts[0] });
        const tokenSWA = await Token.at(await reserveSWA.getTokenAddress());

        var exchange = await Exchange.new({ from: accounts[0] });

        // Kết nối contracts
        await exchange.addReserve(reserveSWA.address, { from: accounts[0] });

        // Chuẩn bị
        await exchange.buyToken(tokenSWA.address, { from: accounts[0], value: web3.utils.toWei("1", 'ether') });

        const initSWA = await tokenSWA.balanceOf(accounts[1]);

        //mua 1 SWA
        await exchange.exchangeEthToToken(tokenSWA.address, { from: accounts[1], value: web3.utils.toWei("0.5", 'ether') });

        const newSWA = await tokenSWA.balanceOf(accounts[1]);

        //ví sẽ thêm 1 SWA
        assert.equal(newSWA, initSWA * 1 + web3.utils.toWei("1", 'ether') * 1, "FAIL");
    });

    it("TC11. Exchange. Function 'exchange'.", async() => {
        // Khởi tạo contracts
        const reserveSWA = await Reserve.new("Jellyfishnya", "SWA", 2, { from: accounts[0] });
        const tokenSWA = await Token.at(await reserveSWA.getTokenAddress());

        const reserveME = await Reserve.new("Meee", "ME", 1, { from: accounts[0] });
        const tokenME = await Token.at(await reserveME.getTokenAddress());

        var exchange = await Exchange.new({ from: accounts[0] });

        // Kết nối contracts
        await exchange.addReserve(reserveSWA.address, { from: accounts[0] });
        await exchange.addReserve(reserveME.address, { from: accounts[0] });

        // Chuẩn bị
        await exchange.buyToken(tokenME.address, { from: accounts[0], value: web3.utils.toWei("2", 'ether') });
        await exchange.buyToken(tokenSWA.address, { from: accounts[0], value: web3.utils.toWei("1", 'ether') });

        //đưa 1 ME cho account 1
        await exchange.exchangeEthToToken(tokenME.address, { from: accounts[1], value: web3.utils.toWei("1", 'ether') });
        const initME = await tokenME.balanceOf(accounts[1]);
        const initSWA = await tokenSWA.balanceOf(accounts[1]);

        //call exchange, đổi 1 ME lấy 2 SWA
        await tokenME.approve(exchange.address, web3.utils.toWei("1", 'ether'), { from: accounts[1] });
        await exchange.exchange(tokenME.address, tokenSWA.address, web3.utils.toWei("1", 'ether'), { from: accounts[1] });

        const newME = await tokenME.balanceOf(accounts[1]);
        const newSWA = await tokenSWA.balanceOf(accounts[1]);

        //ví sẽ giảm 1 ME và thêm 2 SWA
        assert.equal(newME, initME * 1 - web3.utils.toWei("1", 'ether') * 1, "FAIL");
        assert.equal(newSWA, initSWA * 1 + web3.utils.toWei("2", 'ether') * 1, "FAIL");
    });

    it("TC12. Exchange. Function 'exchangeTokenToEth'.", async() => {
        // Khởi tạo contracts
        const reserveSWA = await Reserve.new("Jellyfishnya", "SWA", 2, { from: accounts[0] });
        const tokenSWA = await Token.at(await reserveSWA.getTokenAddress());

        var exchange = await Exchange.new({ from: accounts[0] });

        // Kết nối contracts
        await exchange.addReserve(reserveSWA.address, { from: accounts[0] });
        // Bơm cho exchange ít gas nè
        await web3.eth.sendTransaction({ from: accounts[0], to: exchange.address, value: web3.utils.toWei("0.001", 'ether') })

        //đưa 1 SWA cho account 1
        await exchange.exchangeEthToToken(tokenSWA.address, { from: accounts[1], value: web3.utils.toWei("0.5", 'ether') });
        const initSWA = await tokenSWA.balanceOf(accounts[1]);
        const initBalance = await web3.eth.getBalance(accounts[1]);

        //đổi 1 SWA lấy 0.5 ETH
        await tokenSWA.approve(exchange.address, web3.utils.toWei("1", 'ether'), { from: accounts[1] });
        await exchange.exchangeTokenToEth(tokenSWA.address, web3.utils.toWei("1", 'ether'), { from: accounts[1] });

        const newSWA = await tokenSWA.balanceOf(accounts[1]);
        const newBalance = await web3.eth.getBalance(accounts[1]);

        //ví sẽ giảm 1 SWA, nhận lại 0.5 ETH
        assert.equal(newSWA, initSWA * 1 - web3.utils.toWei("1", 'ether') * 1, "FAIL");
        assert(newBalance > (initBalance), "FAIL");
    });
});