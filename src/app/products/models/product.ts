import { commerce as FakerComerse } from 'faker';

export interface IProductModel {
  color: string;
  department: string;
  productName: string;
  price: string;
  productAdjective: string;
  productMaterial: string;
  product: string;
  count: number;
}
export class ProductModel implements IProductModel {
  public readonly color: string;
  public readonly department: string;
  public readonly productName: string;
  public readonly price: string;
  public readonly productAdjective: string;
  public readonly productMaterial: string;
  public readonly product: string;
  public count: number;

  constructor(init: IProductModel) {
    this.color = init.color;
    this.department = init.department;
    this.productName = init.productName;
    this.price = init.price;
    this.productAdjective = init.productAdjective;
    this.productMaterial = init.productMaterial;
    this.product = init.product;
    this.count = init.count;
  }

  public static fromFaker(): ProductModel {
    return new ProductModel({
      color: FakerComerse.color(),
      department: FakerComerse.department(),
      productName: FakerComerse.productName(),
      price: FakerComerse.price(),
      productAdjective: FakerComerse.productAdjective(),
      productMaterial: FakerComerse.productMaterial(),
      product: FakerComerse.product(),
      count: Math.floor(Math.random() * 10)
    });
  }
}
