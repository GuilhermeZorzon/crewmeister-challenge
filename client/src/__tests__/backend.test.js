const backendRoutes = require("../components/constants/backendRoutes.json");
const app = require("../../../server/server.js");
const request = require("supertest")('http://localhost:5000/api');

describe("Testing API", () => {
    it("Testing members API", async () => {
        let { body } = await request.get('/members/all')
        expect(body.result[0]).toHaveProperty("userId");
        expect(body.result[0]).toHaveProperty("name");
        expect(body.result[0]).toHaveProperty("crewId");
    });
    
    it("Testing absences API", async () => {
        let { body } = await request.get('/absences')
        expect(body.result[0]).toHaveProperty("startDate");
        expect(body.result[0]).toHaveProperty("endDate");
        expect(body.result[0]).toHaveProperty("name");
        expect(body.result[0]).toHaveProperty("crewId");
    });
});