import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
      price: 10,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product");
    expect(response.body.price).toBe(10);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "product",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product",
      price: 10,
    });
    expect(response.status).toBe(200);
    const response2 = await request(app).post("/product").send({
      name: "Product 2",
      price: 20,
    });
    expect(response2.status).toBe(200);

    const response3 = await request(app).get("/product");
    expect(response3.status).toBe(200);
    expect(response3.body.products.length).toBe(2);

    expect(response3.body.products[0].name).toBe("Product");
    expect(response3.body.products[0].price).toBe(10);

    expect(response3.body.products[1].name).toBe("Product 2");
    expect(response3.body.products[1].price).toBe(20);
  });
});
