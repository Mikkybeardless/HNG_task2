import bcrypt from "bcrypt";
import request from "supertest";
import app from "../src/app.js";
import db from "../src/models/index";

const { Users, Orgs, sequelize } = db;

describe("E2E tests", () => {
  jest.setTimeout(20000);

  const clearDB = async () => {
    await Users.destroy({ where: {} });
  };

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should not be able to login", async () => {
    await clearDB();
    const res = await request(app).post("/auth/login").send({
      email: "test@yahoo.com",
      password: "password",
    });
    console.log(res.body);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Authentication failed");
    expect(res.body.status).toEqual("Bad request");
  });

  it("should register user successfully", async () => {
    await clearDB();
    const res = await request(app).post("/auth/register").send({
      firstName: "James",
      lastName: "Test User",
      email: "mikky@gmail.com",
      password: "password",
      phone: "0903454987",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("Registration successfully");
    expect(res.body.data.user).toHaveProperty("userId");
    expect(res.body.data.user.firstName).toEqual("James");
    expect(res.body.data.user).toHaveProperty("email");
    expect(res.body.data.user.email).toEqual("mikky@gmail.com");
    expect(res.body.data).toHaveProperty("accessToken");
    expect(res.body.data.user).not.toHaveProperty("password");
  });

  it("should login user successfully", async () => {
    await clearDB();
    await Users.create({
      firstName: "Grace",
      lastName: "Test User",
      email: "yam@gmail.com",
      password: await bcrypt.hash("password", 10),
      phone: "0806758434",
    });

    const res = await request(app).post("/auth/login").send({
      email: "yam@gmail.com",
      password: "password",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.message).toEqual("Login successful");
    expect(res.body.data).toHaveProperty("accessToken");
    expect(res.body.data).not.toHaveProperty("password");
  });

  it("should fail to login user - Missing fields", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "test@mymail.com",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual(
      "Authentication failed due to invalid credentials"
    );
    expect(res.body).toHaveProperty("errors");
  });

  it("should fail to register user- invalid payload", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "test@mymail.com",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Registration unsuccesful");
    expect(res.body).toHaveProperty("errors");
  });
});
