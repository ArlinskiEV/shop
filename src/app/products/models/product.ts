import {
  commerce as FakerComerse,
  random as FakerRandom
} from 'faker';

export interface IProductModel {
  id: string;
  color: string;
  department: string;
  productName: string;
  price: number;
  productAdjective: string;
  productMaterial: string;
  product: string;
}
export class ProductModel implements IProductModel {
  public readonly id: string;
  public readonly color: string;
  public readonly department: string;
  public readonly productName: string;
  public readonly price: number;
  public readonly productAdjective: string;
  public readonly productMaterial: string;
  public readonly product: string;

  constructor(init: IProductModel) {
    this.id = init.id;
    this.color = init.color;
    this.department = init.department;
    this.productName = init.productName;
    this.price = init.price;
    this.productAdjective = init.productAdjective;
    this.productMaterial = init.productMaterial;
    this.product = init.product;
  }

  public static fromFaker(): ProductModel {
    return new ProductModel({
      id: FakerRandom.uuid(),
      color: FakerComerse.color(),
      department: FakerComerse.department(),
      productName: FakerComerse.productName(),
      price: +FakerComerse.price(),
      productAdjective: FakerComerse.productAdjective(),
      productMaterial: FakerComerse.productMaterial(),
      product: FakerComerse.product()
    });
  }
}

export type ProductsStore = { [key: string]: ProductModel };
export type ProductsCountsStore = { [key: string]: number };
