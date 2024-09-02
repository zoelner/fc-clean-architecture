import CreateProductUseCase from "./create.product.usecase";

function makeSut() {
  const productRepository = {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
  const productCreateUseCase = new CreateProductUseCase(productRepository);

  return { productCreateUseCase, productRepository };
}

describe("Unit test create product use case", () => {
  it("should create a product a", async () => {
    const { productCreateUseCase } = makeSut();

    const input = {
      name: "Product",
      price: 100,
    };

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should create a product b", async () => {
    const { productCreateUseCase } = makeSut();

    const input = {
      name: "Product B",
      price: 200,
    };

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: 200,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const { productCreateUseCase } = makeSut();

    const input = {
      type: "a",
      name: "",
      price: 100,
    };

    await expect(productCreateUseCase.execute(input)).rejects.toThrowError(
      "Name is required"
    );
  });
  it("should thrown an error when price is negative", async () => {
    const { productCreateUseCase } = makeSut();

    const input = {
      type: "a",
      name: "Product",
      price: -1,
    };

    await expect(productCreateUseCase.execute(input)).rejects.toThrowError(
      "Price must be greater than zero"
    );
  });
});
