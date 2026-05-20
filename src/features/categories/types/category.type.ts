/**
* Category Feature Types
*/
​
export interface Subcategory {
 id: string;
 name: string;
 slug: string;
}
​
export interface Category {
 id: string;
 name: string;
 slug: string;
 image: string;
 description: string;
 productCount: number;
 subcategories?: Subcategory[];
}
​
export interface ApiResponse<T> {
 success: boolean;
 data: T;
 message?: string;
 timestamp: string;
}
