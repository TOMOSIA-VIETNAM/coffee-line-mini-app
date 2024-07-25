export default interface Image {
    id: number;
    path_name: string;
    size: string;
    type: string;
    created_at: string;
    updated_at: string;
    pivot: {
        product_id: string;
        image_id: number;
    };
}
