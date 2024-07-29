export class Product {
    id: number | null;
    product: string;
    price: number;
    image: string;
    image_s3: string;

    constructor(id:number | null, product: string, price: number, image: string, image_s3:string){
        this.id = id;
        this.product = product;
        this.price = price;
        this.image = image;
        this.image_s3 = image_s3
    }
}