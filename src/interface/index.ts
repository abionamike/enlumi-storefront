interface IStore {
    id: number,
    subaccount: string,
    name: string,
    address: string,
    status: string,
    vat: number,
    is_warehouse: boolean,
    store_category: string | null,
    allow_table: boolean,
    allow_generate_bill: boolean,
    created_at: string
}

interface IProductProperties {
    cost_price: number,
    selling_price: number,
    discount_rate: number,
    stock_quantity: number,
    minimum_stock_quantity: number,
    expiry_date: string,
    store_id: 4,
    store_name: string
}

export interface IProduct {
    id: number,
    name: string,
    business: number,
    sku: string,
    barcode: null,
    category: {
        id: number,
        name: string,
        description: string,
        business: number,
        created_at: string,
        updated_at: string,
        status: string
    },
    cost_price: number,
    selling_price: number,
    image_url: string | null,
    stock_quantity: number,
    minimum_stock_quantity: number,
    supplier: null,
    expiry_date: string,
    variants: [],
    profit_margin: string,
    status: string,
    stock_status: string,
    unit: string | null,
    stores: IStore[],
    store_product_properties: IProductProperties[],
    is_service: false
}