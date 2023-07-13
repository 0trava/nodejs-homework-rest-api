
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");

const { DB_HOST, PORT = 3000 } = process.env;

describe ("tests for login controllers", () => {
    beforeAll(() =>
      mongoose
        .connect(DB_HOST)
        .then(() => {
          console.log("database connection successful");
          app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
          });
        })
        .catch((error) => {
          console.log(`Server is not running. Error message: ${error.message}`);
          process.exit(1);
        })
    );
  
    test("login returns response status 200 and response body must contain a token ", async () => {
      const response = await request(app).post("/api/users/login").send({
        email: "0trava0910@gmail.com",
        password: "123456",
      });
      
      expect(response.status).toBe(200);
      expect(typeof response.body.token).toBe("string");
  
  });
});