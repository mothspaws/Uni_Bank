const tools = require('../my_library.js');
const dbase = require('../dbase.js');
const mailer = require('../mailer.js');

jest.mock('../dbase.js');
jest.mock('../mailer.js');

describe('my_library.js tests', () => {
    afterAll(() => {
        dbase.close();
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

    describe('sendEmail', () => {
        it('should send email', async () => {
            const email = 'viktoria.sr@icloud.com';
            mailer.sendEmail.mockResolvedValue();
            const result = await tools.sendEmail(email, '123456');
            expect(mailer.sendEmail).toHaveBeenCalledWith(email, '123456');
        });

        it('should not send email', async () => {
            // Arrange
            const email = 'verybademail';
            const error = new Error('Invalid email');
            mailer.sendEmail.mockRejectedValue(error);

            // Act
            try {
                const result = await tools.sendEmail(email, '123456');
            } catch (err) {
                // Assert
                expect(mailer.sendEmail).toHaveBeenCalledWith(email, '123456');
                expect(err).toEqual(error);
            }
        });
    });

    describe('adopt amount by currency', () => {
        // clear moc for tools.adoptAmountByCurrency
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should adopt amount by currency', async () => {
            // Arrange  
            const currency = 'CZK';
            const amount = 100;
            const rate = 1; // This should be the actual rate for the currency
            const quantity = 1; // This should be the actual quantity for the currency
            const expected = (amount * rate) / quantity;
    
            // Assume the mock for dbase.getLatestRate
            dbase.getLatestRate.mockResolvedValue({ rate, quantity });
    
            // Act
            const result = await tools.adoptAmountByCurrency(currency, amount);
    
            // Assert
            expect(result).toEqual(expected);
        });
    });  

    describe('payment', () => {
        beforeEach(() => {
            // Mock dbase functions
            dbase.getUsers = jest.fn();
            dbase.getAuthCode = jest.fn();
            dbase.getCurrencies = jest.fn().mockResolvedValue(['CZK', 'USD', 'EUR']);
            dbase.getLatestRate = jest.fn();
            dbase.getBalance = jest.fn().mockResolvedValue(1000);
            dbase.updateBalance = jest.fn();
            dbase.getMaxTransactionId = jest.fn();
            dbase.insertTransaction = jest.fn();

            // Mock tools functions
            tools.haveUserCurrency = jest.fn();
            tools.adoptAmountByCurrency = jest.fn();
            tools.controleAmount = jest.fn();
            tools.makePayment = jest.fn();
        });
        it('should make payment', async () => {
            // Arrange
            const username = 'testUser';
            const currency = 'CZK';
            const amount = 100;
            tools.haveUserCurrency.mockResolvedValue(true);
            tools.adoptAmountByCurrency.mockResolvedValue({ currency, amount });
            tools.controleAmount.mockResolvedValue(true);
            tools.makePayment.mockResolvedValue(true);

            // Act
            const result = await tools.payment(username, currency, amount);

            // Assert
            expect(result).toBe(true);
        });

        it('should not make payment', async () => {
            // Arrange
            const username = 'testUser';
            const currency = 'CZK';
            const amount = -10000;
            tools.haveUserCurrency.mockResolvedValue(true);
            tools.adoptAmountByCurrency.mockResolvedValue(amount);
            tools.controleAmount.mockResolvedValue(false);
            tools.makePayment.mockResolvedValue(false);

            // Act
            const result = await tools.payment(username, currency, amount);

            // Assert
            expect(result).toBe(false);
        });
    });

    describe('haveUserCurrency', () => {
        // clear moc for tools.haveUserCurrency
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should have user currency', async () => {
            // Arrange
            const username = 'testUser';
            const currency = 'CZK';

            // Act
            const result = await tools.haveUserCurrency(username, currency);

            // Assert
            expect(result).toBe(true);
        });
    });

    describe('makePayment', () => {
        it('should not make payment', async () => {
            // Arrange
            const username = 'testUser';
            const currency = 'CZK';
            const amount = 10000;
            const transaction_cur = 'CZK';
            const balance = 1000;
            const transaction_id = 1;
            tools.haveUserCurrency.mockResolvedValue(true);
            dbase.getBalance.mockResolvedValue(balance);
            dbase.getMaxTransactionId.mockResolvedValue(transaction_id);

            // Act
            const result = await tools.makePayment(username, transaction_cur, currency, amount);

            // Assert
            expect(result).toBe(false);
        });
    });  

    describe('makePayment with overdraft', () => {
        beforeEach(() => {
            // clear mocks
            jest.clearAllMocks();
            // Mock dbase functions
            // set balance to 1000
            dbase.getBalance = jest.fn().mockResolvedValue(1000);
            dbase.updateBalance = jest.fn();
            dbase.getMaxTransactionId = jest.fn().mockResolvedValue(1);
            dbase.insertTransaction = jest.fn();
        });

        it('should not make payment without overdraft', async () => {
            // Arrange
            const username = 'testUser';
            const using_currency = 'CZK';
            const payment_currency = 'CZK';
            const spent_amount = -2000;
            const isOverdraftAllowed = false;
            tools.adoptAmountByCurrency.mockResolvedValue(spent_amount);

            // Act
            const result = await tools.makePayment(username, using_currency, payment_currency, spent_amount, isOverdraftAllowed);

            // Assert
            expect(result).toBe(false);
            expect(dbase.updateBalance).not.toHaveBeenCalled();
            expect(dbase.insertTransaction).not.toHaveBeenCalled();
        });
    });
});
