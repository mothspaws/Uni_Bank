const supertest = require("supertest");
const app = require("../index.js");
const dbase = require("../dbase.js");
const name = "testUser";

// beforeAll creates a user and some transactions
beforeAll(async () => {
    await dbase.insertUser(name, "testPassword", "testUser@example.com", 'CZK', 1000);
    await dbase.insertCurrency(name, "EUR", 26);
    await dbase.insertCurrency(name, "USD", 130);
    await dbase.insertTransaction(6, name, "CZK", new Date("2023-01-13 15:17:09").getTime(), -50);
    await dbase.insertTransaction(7, name, "EUR", new Date("2023-03-14 12:08:56").getTime(), 2.1);
    await dbase.insertTransaction(8, name, "USD", new Date("2023-03-14 12:08:56").getTime(), 2.1);
});

afterAll(async () => {
    await dbase.deleteUser(name);
});

// login
describe("POST /api/login", () => {
    it("should login with valid credentials", async () => {
        const body = {
            username: name,
            password: "testPassword",
        };

        const response = await supertest(app).post("/api/login").send(body);
        expect(response.status).toEqual(200);
        expect(response.body.success).toBe(true);
    }, 10000);

    it("should not login with invalid credentials", async () => {
        const body = {
            username: "invalidUser",
            password: "invalidPassword",
        };

        const response = await supertest(app).post("/api/login").send(body);
        expect(response.status).toEqual(200);
        expect(response.body.success).toBe(false);
    });
});

// authenticate
describe("POST /api/authenticate", () => {
    it("should authenticate with valid code", async () => {
        const user = await dbase.getAuthCode(name);
        valid_code = user.auth_code;

        const body = {
            username: name,
            code: valid_code,
        };

        const response = await supertest(app).post("/api/authenticate").send(body);
        expect(response.status).toEqual(200);
        expect(response.body.success).toBe(true);
    });

    it("should not authenticate with invalid code", async () => {
        const body = {
            username: name,
            code: "000000",
        };

        const response = await supertest(app).post("/api/authenticate").send(body);
        expect(response.status).toEqual(200);
        expect(response.body.success).toBe(false);
    });
});

// user-data
describe("GET /api/user-data/:username", () => {
    it("should get user data", async () => {
        const response = await supertest(app).get(`/api/user-data/${name}`);
        expect(response.status).toEqual(200);
        expect(response.body.currencies).toEqual(expect.anything());
    });

    it("should not get user data", async () => {
        const response = await supertest(app).get(`/api/user-data/invalidUser`);
        expect(response.status).toEqual(200);
        expect(response.body.currencies).toEqual([]);
    });
});

// payment
describe("POST /api/payment", () => {
    const name = "testUser";
    const currency_in = "USD";

    it("should make payment", async () => {
        const body = {
            username: name,
            currency: currency_in,
            amount: 1,
        };

        const response = await supertest(app).post("/api/payment").send(body);
        expect(response.status).toEqual(200);
        expect(response.body.result).toBe(true);
    });

    it("should not make payment", async () => {
        const body = {
            username: name,
            currency: "USD",
            amount: -100000,
        };

        const response = await supertest(app).post("/api/payment").send(body);
        expect(response.status).toEqual(200);
        expect(response.body.result).toBe(false);
    });

    it("should run error, invalid request 1", async () => {
        const body = {
            username: {
                name: name,
                currency: currency_in
            }
        };

        const response = await supertest(app).post("/api/payment").send(body);
        expect(response.status).toEqual(400);
        expect(response.body.result).toBe(false);
    });

    it("should run error, invalid request 2", async () => {
        const body2 = {
            username: name,
            amount: 1
        };

        const response2 = await supertest(app).post("/api/payment").send(body2);
        expect(response2.status).toEqual(400);
        expect(response2.body.result).toBe(false);
    });

    it("should run error, invalid request 3", async () => {
        const body3 = {
            currency: currency_in,
            amount: 1
        };

        const response3 = await supertest(app).post("/api/payment").send(body3);
        expect(response3.status).toEqual(400);
        expect(response3.body.result).toBe(false);

    });

    it("should make payment", async () => {
        const body4 = {
            username: name,
            currency: currency_in,
            amount: 1,
        };

        const response4 = await supertest(app).post("/api/payment").send(body4);
        expect(response4.status).toEqual(200);
        expect(response4.body.result).toBe(true);
    });
});

// currencies
describe("GET /api/currencies", () => {
    it("should get all currencies", async () => {
        const response = await supertest(app).get("/api/currencies");
        expect(response.status).toEqual(200);
        // const equal to AUD,BRL,BGN,CNY,DKK,EUR,PHP,HKD,INR,IDR,ISK,ILS,JPY,ZAR,CAD,KRW,HUF,MYR,MXN,XDR,NOK,NZD,PLN,RON,SGD,SEK,CHF,THB,TRY,USD,GBP
        expect(response.body.currencies).toEqual(expect.anything());
    });
});
