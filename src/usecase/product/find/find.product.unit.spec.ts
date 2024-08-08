import Product from "../../../domain/product/entity/product";
import ProductB from "../../../domain/product/entity/product-b";
import FindProductUseCase from "./find.product.usecase";

function makeSut() {
  const productRepository = {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
  const productFindUseCase = new FindProductUseCase(productRepository);

  return { productFindUseCase, productRepository };
}

describe("Unit test find product use case", () => {
  it("should find a product a", async () => {
    const { productFindUseCase, productRepository } = makeSut();
    productRepository.find.mockReturnValue(
      Promise.resolve(new Product("123", "Product A", 100))
    );

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Product A",
      price: 100,
    };

    const result = await productFindUseCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should find a product b", async () => {
    const { productFindUseCase, productRepository } = makeSut();

    productRepository.find.mockReturnValue(
      Promise.resolve(new ProductB("123", "Product B", 200))
    );

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "Product B",
      price: 400,
    };

    const result = await productFindUseCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const { productFindUseCase, productRepository } = makeSut();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const input = {
      id: "123",
    };

    expect(() => {
      return productFindUseCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
