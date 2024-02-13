const createUserController = require("../src/controllers/UserControllers/CreateUserController");
const UserManager = require("../src/models/UserManager");

jest.mock("../src/models/UserManager");

describe("CreateUserController", () => {
  it("should return status 201 and user data on successful insertion", async () => {
    const req = {
      body: {
        firstname: "John",
        lastname: "Doe",
        username: "johndoe",
        role: "user",
        email: "johndoe@example.com",
        password: "password123",
        address: "123 Main St",
        phone: "123-456-7890",
        postalCode: "12345",
        city: "Cityville",
      },
    };
    const mockInsertUser = jest
      .spyOn(UserManager, "insertUser")
      .mockResolvedValue({
        status: 201,
        message: {
          id: 1,
          ...req.body,
        },
      });

    const res = {
      json: jest.fn(),
    };

    await createUserController(req, res);

    expect(mockInsertUser).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({
      status: 201,
      message: {
        id: 1,
        ...req.body,
      },
    });
  });
});
