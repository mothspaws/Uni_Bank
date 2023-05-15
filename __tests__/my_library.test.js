const tools = require('../my_library.js');
const dbase = require('../dbase.js');
const sinon = require('sinon');

describe('my_library.js tests', () => {
    afterAll(async () => {
        await dbase.close();
    });

    beforeEach(() => {
        sinon.stub(dbase, 'getUsers');
        sinon.stub(dbase, 'getAuthCode');
        sinon.stub(dbase, 'getLatestRate');
        sinon.stub(dbase, 'getBalance');
        sinon.stub(dbase, 'updateBalance');
        sinon.stub(dbase, 'getMaxTransactionId');
        sinon.stub(dbase, 'insertTransaction');
        sinon.stub(tools, 'adoptAmountByCurrency');
        sinon.stub(tools, 'controleAmount');
        sinon.stub(tools, 'makePayment');
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('generateSixDigitCode', () => {
        it('should generate a six-digit code', () => {
            const code = tools.generateSixDigitCode();
            expect(code).toBeGreaterThanOrEqual(100000);
            expect(code).toBeLessThan(1000000);
        });
    });

    describe('isValidLogin', () => {
        it('should validate login credentials', async () => {
            const username = 'testUser';
            const password = 'testPassword';
            dbase.getUsers.returns(Promise.resolve([{ username: 'testUser', password: 'testPassword', email: 'testUser@example.com' }]));

            const { result, email } = await tools.isValidLogin(username, password);

            expect(result).toBe(true);
            expect(email).toBe('testUser@example.com');
        });

        it('should return false if credentials are invalid', async () => {
            const username = 'invalidUser';
            const password = 'invalidPassword';
            dbase.getUsers.resolves([{ username: 'testUser', password: 'testPassword', email: 'testUser@example.com' }]);

            const { result, email } = await tools.isValidLogin(username, password);

            expect(result).toBe(false);
            expect(email).toBeNull();
        });
    });

    describe('isValidCode', () => {
        it('should validate authentication code', async () => {
            const username = 'testUser';
            const auth_code = '123456';
            dbase.getAuthCode.resolves({ auth_code });

            const result = await tools.isValidCode(username, auth_code);

            expect(result).toBe(true);
        });

        it('should return false if code is invalid', async () => {
            const username = 'testUser';
            const auth_code = '123456';
            dbase.getAuthCode.resolves({ auth_code });

            const result = await tools.isValidCode(username, 'invalidCode');

            expect(result).toBe(false);
        });
    });

    describe('haveUserCurrency', () => {
        it('should check if user has currency', async () => {
            const username = 'testUser';
            const currency = 'EUR';
            dbase.getCurrencies.resolves(Promise.resolve([{ currency: 'EUR' }]));

            const result = await tools.haveUserCurrency(username, currency);

            expect(result).toBe(true);
        });

        it('should return false if user does not have currency', async () => {
            const username = 'testUser';
            const currency = 'EUR';
            dbase.getCurrencies.resolves(Promise.resolve([{ currency: 'CZK' }]));

            const result = await tools.haveUserCurrency(username, currency);

            expect(result).toBe(false);
        });
    });
});
