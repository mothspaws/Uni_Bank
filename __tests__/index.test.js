const supertest = require("supertest");
const app = require("../index.js");
const dbase = require("../dbase.js");
const name = "testUser";
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
    });

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
    it("should make payment", async () => {
        const body = {
            username: name,
            currency: "USD",
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
