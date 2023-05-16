const fetch = require('node-fetch');
const dbase = require('../dbase.js');
const api_cnb = require('../api_cnb.js');
jest.mock('../dbase.js');

const mockFetch = jest.fn().mockImplementation(() => {
    return Promise.resolve({
        ok: true,
        text: () => Promise.resolve(`
            země|měna|množství|kód|kurz
            Austrálie|dolar|1|AUD|15,919
            Brazílie|real|1|BRL|4,403
            Bulharsko|lev|1|BGN|13,036")
            `)
    });
});

global.fetch = mockFetch;

describe('fetchAndStoreRates', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        // mock insertRate
        dbase.insertRate.mockImplementation((date, country, currency, quantity, code, rate) => {
            return Promise.resolve();
        });
    });
    it('should fetch rates and store them successfully', async () => {

        await api_cnb.fetchAndStoreRates();

        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(dbase.insertRate).toHaveBeenCalledTimes(3);
    });

    it('should log an error if the response is not ok', async () => {
        console.error = jest.fn();  // mock console.error

        mockFetch.mockImplementationOnce(() => {
            return Promise.resolve({
                ok: false,
            });
        });

        await api_cnb.fetchAndStoreRates();

        expect(console.error).toHaveBeenCalledWith("Error fetching exchange rates:", new Error('HTTP error! status: undefined'));
    });
});
