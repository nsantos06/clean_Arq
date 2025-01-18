import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";
import { UUIDV4 } from "sequelize";


describe("Test create product use case", () => {
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


it("should create a product", async () => {
    //const productRepository = new ProductRepository();
     //const usecase = new FindProductUseCase(productRepository);
        
        //const product = new Product("123", "Produto 1", 10); 
        //await productRepository.create(product);

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const product = new Product("123", "Produto 1", 10); 
    await productRepository.create(product);

    const input = {
        id: "123",
        name: "Produto 1",
        price:10
      }
    
      const output = {
        id: expect.any(String),
        name: "Produto 1",
        price: 10,
      }
    
      const result = await usecase.execute(input);
      expect(result).toEqual(output);
    
})

})
