import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductUpdateUseCase from "./update.product.usecase";

function makeSut() {
  const productRepository = {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };

  const productUpdateUseCase = new ProductUpdateUseCase(productRepository);
  return { usecase: productUpdateUseCase, repository: productRepository };
}

describe("Unit test for updating product use case", () => {
  it("should update a product", async () => {
    const { usecase, repository } = makeSut();

    const product = ProductFactory.create("Product A", 100);

    repository.find.mockResolvedValueOnce(product);

    const output = await usecase.execute({
      id: product.id,
      name: "Product A Updated",
      price: 200,
    });

    expect(output.id).toBe(product.id);
    expect(output.name).toBe("Product A Updated");
    expect(output.price).toBe(200);
  });
});
