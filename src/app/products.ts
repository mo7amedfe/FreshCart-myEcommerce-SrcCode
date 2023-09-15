export interface Products {
    _id: string,
    title: string,
    slug: string,
    description: string,
    quantity: number,
    price: number,
    priceAfterDiscount?:number,
    imageCover: string,
    images:string[],
    category :category,
    ratingsAverage :number


}
export interface category {
    _id :string,
    name:string,
    slug:string,
    image:string
   
}
