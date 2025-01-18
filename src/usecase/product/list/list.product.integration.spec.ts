import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list a product", async () => {
    // Configurar o repositório e o caso de uso
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    // Criar produtos no repositório
    const product0 = new Product("123", "Produto 1", 10);
    const product1 = new Product("456", "Produto 2", 15);
    await productRepository.create(product0);
    await productRepository.create(product1);

    // Executar o caso de uso
    const output = await usecase.execute({});

    // Validar o resultado
    expect(output.products).toHaveLength(2);
    expect(output.products).toEqual([
      { id: "123", name: "Produto 1", price: 10 },
      { id: "456", name: "Produto 2", price: 15 },
    ]);
  });
});
