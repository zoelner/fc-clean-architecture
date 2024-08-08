import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductListUseCase from "./list.product.usecase";

function makeSut() {
  const productRepository = {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };

  const productListUseCase = new ProductListUseCase(productRepository);
  return { usecase: productListUseCase, repository: productRepository };
}

describe("Unit test for listing product use case", () => {
  it("should list a product", async () => {
    const { usecase, repository } = makeSut();

    const product1 = ProductFactory.create("a", "Product A", 100);
    const product2 = ProductFactory.create("b", "Product B", 200);

    repository.findAll.mockResolvedValueOnce([product1, product2]);

    const output = await usecase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
