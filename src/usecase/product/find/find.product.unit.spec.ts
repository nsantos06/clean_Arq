import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

const product = new Product("123", "Bronzina", 15);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}


describe("Unit Test find product use case", () => {

});


it("should find the products", async() => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository)
   
    
    
    const input = {
        id: "123",

    }
    const output = { 
        id: "123",
        name: "Bronzina",
        price: 15,
    }

    const result = await usecase.execute(input); 

    expect(result).toEqual(output);
});
