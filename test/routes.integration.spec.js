// test/app.integration.spec.js
const request = require("supertest");
const app = require("../app");
const connection = require("../db");
const createMessageController = require("../src/controllers/MessageControllers/CreateMessageController");
const MessageManager = require("../src/models/MessageManager");

jest.mock("../src/models/MessageManager");

describe("createMessageController", () => {
  it("should return status 201 and message on successful insertion", async () => {
    const req = {
      body: {
        email: "test@example.com",
        subject: "Test",
        content: "Test message",
        isRead: false,
      },
    };
    const mockInsertMessage = jest
      .spyOn(MessageManager, "insertMessage")
      .mockResolvedValue({ status: 201, message: "message created" });

    const res = {
      json: jest.fn(),
    };

    await createMessageController(req, res);

    expect(mockInsertMessage).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({
      status: 201,
      message: "message created",
    });
  });
});

describe("Test routes wines", () => {
  beforeEach(async () => {
    try {
      const results = await connection.promise().query("SELECT * FROM wine");
      global.testMessages = results[0];
    } catch (error) {
      throw error;
    }
  });

  it("GET /wines", async () => {
    try {
      const response = await request(app)
        .get("/wines")
        .expect(200)
        .expect("Content-Type", /json/);
      expect(response.body).toEqual(global.testMessages);
    } catch (error) {
      throw error;
    }
  });
});


describe("Test routes users", () => {
  beforeEach(async () => {
    try {
      const results = await connection.promise().query("SELECT * FROM user");
      global.testMessages = results[0];
    } catch (error) {
      throw error;
    }
  });

  it("GET /users", async () => {
    try {
      const response = await request(app)
        .get("/users")
        .expect(200)
        .expect("Content-Type", /json/);
      expect(response.body).toEqual(global.testMessages);
    } catch (error) {
      throw error;
    }
  });
});

describe("Test routes carts", () => {
  beforeEach(async () => {
    try {
      const results = await connection
        .promise()
        .query("SELECT * FROM cart WHERE id = 1");
      global.testMessages = results[0];
    } catch (error) {
      throw error;
    }
  });

  it("GET /carts/1", async () => {
    try {
      const response = await request(app)
        .get("/carts/1")
        .expect(200)
        .expect("Content-Type", /json/);
      const exepted = {
        content: [
          {
            cart_wine_id: null,
            image: null,
            name: null,
            origin_country: null,
            price: null,
            quantity: null,
            total: null,
            wine_id: null,
            wine_type: null,
          },
        ],
        id: 1,
        is_order: 0,
        user_id: 1,
      };
      expect(response.body).toEqual(exepted);
    } catch (error) {
      throw error;
    }
  });
});


