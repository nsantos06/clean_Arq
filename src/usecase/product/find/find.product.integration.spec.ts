import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

     
       sequelize = new Sequelize({
         dialect: "sqlite",
         storage: ":memory:",
         logging: false,
         models: [ProductModel],
         sync: { force: true },
       });
   
        sequelize.addModels([ProductModel]);
        sequelize.sync();
       
     });
   



it("should find a product:", async() => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Bronzina", 15);
    await productRepository.create(product);
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
