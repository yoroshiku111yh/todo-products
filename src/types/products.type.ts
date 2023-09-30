export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    thumbnail: string;
    images: string[];
};

export interface GetProductsApiResponse {
    products: Product[];
    total: number;
    limit: number;
    skip: number;
}

export interface DataProductsGroupByCate {
    category : string,
    data : Product[]
}

export type  GetCategoriesApiResponse = string[];

export type TypeStringNumber = string | number;