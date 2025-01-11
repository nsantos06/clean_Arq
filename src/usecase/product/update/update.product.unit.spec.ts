import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductService from "../../../domain/product/service/product.service";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 0);
const input = {
    id: product.id,
    name: "Product Updated",
    price: product.price,
}


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for product update use case", () => {
    it("should update the product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input)

        expect(output).toEqual(input);

    })
})