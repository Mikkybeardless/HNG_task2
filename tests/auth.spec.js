import bcrypt from "bcrypt";
import request from "supertest";
import app from "../src/app.js";
import db from "../src/models/index";

const { Users, sequelize } = db;

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
    const res = await request(app).post("/auth/sign_in").send({
      email: "test@yahoo.com",
      password: "password",
    });
    console.log(res.body);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Authentication failed");
    expect(res.body.status).toEqual("Bad request");
  });

  it("should be able to sign up", async () => {
    await clearDB();
    const res = await request(app).post("/auth/sign_up").send({
      first_name: "James",
      last_name: "Test User",
      email: "mikky@gmail.com",
      password: "password",
      confirmPassword: "password",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("User created successfully");
    expect(res.body.data.user).toHaveProperty("id");
    expect(res.body.data.user).toHaveProperty("first_name");
    expect(res.body.data.user.first_name).toEqual("James");
    expect(res.body.data.user).toHaveProperty("email");
    expect(res.body.data.user.email).toEqual("mikky@gmail.com");
  });

  it("should be able to sign in", async () => {
    await clearDB();
    await Users.create({
      first_name: "Grace",
      last_name: "Test User",
      email: "yam@gmail.com",
      password: await bcrypt.hash("password", 10),
    });

    const res = await request(app).post("/auth/sign_in").send({
      email: "yam@gmail.com",
      password: "password",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Login successful");
    expect(res.body.data).toHaveProperty("accessToken");
    expect(res.body.data).not.toHaveProperty("password");
  });

  it("should not be able to sign in - invalid payload", async () => {
    const res = await request(app).post("/auth/sign_in").send({
      email: "test@mymail.com",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Validation Error");
    expect(res.body).toHaveProperty("errors");
  });

  it("should not be able to create blog without token", async () => {
    const res = await request(app).post("/blogs/create").send({
      title: "The meg",
      description: "This is the first test blog post",
      author: "Igashi",
      body: "welcome to test 1234. hope you get it.",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Unauthorized");
  });

  it("should not be able to sign in - invalid payload", async () => {
    const res = await request(app).post("/auth/sign_in").send({
      email: "test@mymail.com",
    });

    console.log(res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Validation Error");
    expect(res.body).toHaveProperty("errors");
  });

  it("should return all blogs", async () => {
    const res = await request(app).get("/blogs").send();

    expect(res.statusCode).toEqual(200);
  });
});
