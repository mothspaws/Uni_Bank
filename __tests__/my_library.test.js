const tools = require('../my_library.js');
const dbase = require('../dbase.js');

jest.mock('../dbase.js');

describe('my_library.js tests', () => {
    // after all tests close the connection to the database
    afterAll(() => {
        dbase.close();
    });
    beforeEach(() => {
        // Mock dbase functions
        dbase.getUsers = jest.fn();
        dbase.getAuthCode = jest.fn();
        dbase.getCurrencies = jest.fn();
        dbase.getLatestRate = jest.fn();
        dbase.getBalance = jest.fn();
        dbase.updateBalance = jest.fn();
        dbase.getMaxTransactionId = jest.fn();
        dbase.insertTransaction = jest.fn();

        // Mock tools functions
        tools.haveUserCurrency = jest.fn();
        tools.adoptAmountByCurrency = jest.fn();
        tools.controleAmount = jest.fn();
        tools.makePayment = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
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
            // Arrange
            const username = 'testUser';
            const password = 'testPassword';
            dbase.getUsers.mockResolvedValue([
                { username: 'testUser', password: 'testPassword', email: 'testUser@example.com' },
            ]);

            // Act
            const { result, email } = await tools.isValidLogin(username, password);

            // Assert
            expect(result).toBe(true);
            expect(email).toBe('testUser@example.com');
        });

        it('should return false if credentials are invalid', async () => {
            // Arrange
            const username = 'invalidUser';
            const password = 'invalidPassword';
            dbase.getUsers.mockResolvedValue([
                { username: 'testUser', password: 'testPassword', email: 'testUser@example.com' },
            ]);

            // Act
            const { result, email } = await tools.isValidLogin(username, password);

            // Assert
            expect(result).toBe(false);
            expect(email).toBe(null);
        });
    });

    describe('isValidCode', () => {
        it('should validate authentication code', async () => {
            // Arrange
            const username = 'testUser';
            const auth_code = '123456';
            dbase.getAuthCode.mockResolvedValue({ auth_code });

            // Act
            const result = await tools.isValidCode(username, auth_code);

            // Assert
            expect(result).toBe(true);
        });

        it('should return false if code is invalid', async () => {
            // Arrange
            const username = 'testUser';
            const auth_code = '123456';
            dbase.getAuthCode.mockResolvedValue({ auth_code });

            // Act
            const result = await tools.isValidCode(username, 'invalidCode');

            // Assert
            expect(result).toBe(false);
        });
    });

    // describe('payment', () => {
    //     it('should return false if user does not have enough funds', async () => {
    //         // Arrange
    //         const username = 'testUser';
    //         const currency = 'USD';
    //         const amount = -100;

    //         tools.haveUserCurrency.mockResolvedValue(true);
    //         tools.controleAmount.mockResolvedValue(false); // User does not have enough funds
    //         dbase.getBalance.mockResolvedValue(50); // Current balance is less than payment amount
    //         tools.adoptAmountByCurrency.mockResolvedValue(100);
    //         dbase.updateBalance.mockResolvedValue();
    //         dbase.getMaxTransactionId.mockResolvedValue(1);
    //         dbase.insertTransaction.mockResolvedValue();

    //         // Act
    //         const result = await tools.payment(username, currency, amount);

    //         // Assert
    //         expect(result).toBe(false);
    //     });

    //     it('should return true if payment was successful', async () => {
    //         // Arrange
    //         const username = 'testUser';
    //         const currency = 'USD';
    //         const amount = 100;

    //         tools.haveUserCurrency.mockResolvedValue(true);
    //         tools.controleAmount.mockResolvedValue(true); // User has enough funds
    //         dbase.getBalance.mockResolvedValue(100); // Current balance is more than payment amount
    //         tools.adoptAmountByCurrency.mockResolvedValue(100);
    //         dbase.updateBalance.mockResolvedValue();
    //         dbase.getMaxTransactionId.mockResolvedValue(1);
    //         dbase.insertTransaction.mockResolvedValue();

    //         // Act
    //         const result = await tools.payment(username, currency, amount);

    //         // Assert
    //         expect(result).toBe(false);
    //     });
    // });
});
