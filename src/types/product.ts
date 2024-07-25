import Image from "@/types/image";
import Category from "@/types/category";

export default interface Product {
    id: string;
    category_id: string;
    shop_id: number;
    title: string;
    description: string;
    price: number;
    status: number;
    created_at: string;
    updated_at: string;
    images: Image[];
    category: Category;
}
