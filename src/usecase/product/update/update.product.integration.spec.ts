import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test update product use case", () => {
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

it("should update a product", async() => {
            //const productRepository = new ProductRepository();
     //const usecase = new FindProductUseCase(productRepository);
        
        //const product = new Product("123", "Produto 1", 10); 
        //await productRepository.create(product);

        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        
        const product = new Product("123", "Produto 1", 10);
        product.changePrice(15);
        product.changeName("Bronzina")
        await productRepository.create(product);
        
      

        const input = { 
            id: product.id,
            name: "Bronzina",
            price: product.price
        }

        const output = { 
            id: product.id,
            name: "Bronzina",
            price: product.price
        }

    
        const result = await usecase.execute(input);
        expect(result).toEqual(output);

        const updatedProduct = await productRepository.find("123");
        expect(updatedProduct?.price).toBe(15);

        const updatedNameProduct = await productRepository.find("123");
        expect(updatedNameProduct?.name).toBe("Bronzina");

    })
})