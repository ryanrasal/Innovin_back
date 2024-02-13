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

  it("devrait renvoyer un tableau de vins avec un statut 200", async () => {
    const response = await request(app).get("/wines");

    expect(response.status).toBe(200);

    const [rows] = await connection.promise().query("SELECT * FROM wine");

    expect(response.body).toEqual(rows); 
  });
});
