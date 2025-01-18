import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import {sequelize } from "../../../infrastructure/api/express";






describe("Test find product use case", () => {
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
  it("should find the product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);
    
    const product = new Product("123", "P1", 10); 
    await productRepository.create(product);
  
    const input = {
      id: "123"
    }
  
    const output = {
      id: "123",
      name: "P1",
      price: 10,
    }
  
    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  
  });
  
});  

