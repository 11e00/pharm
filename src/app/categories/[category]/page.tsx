import { createClient } from "@supabase/supabase-js";
import ProdList from "@/app/categories/[category]/clientFunctions";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type Products = {
    drug_id: string;
    price: string;
    name: string;
    stock: string;
    visible: string;
    category_name: string;
};

//TODO Make "All-items" return all items
export default async function CategoryPage({ params }: { params: { category: string } }) {
    const categoryName = params.category;
    console.log("Category param:", categoryName);
        
    let products: Products[] = [];

    try {
        const { data: productArr, error: apiError } = await supabase
            .from('Drug')
            .select('drug_id, name, price, stock, visible, Category!inner(category_name, category_id)')
            .eq('Category.category_name', categoryName);

        if (apiError) throw apiError;

        products = (productArr ?? []).map((item) => ({
            drug_id: item.drug_id,
            name: item.name,
            price: item.price,
            stock: item.stock,
            visible: item.visible,
            category_name: item.Category[0]?.category_name ?? '', 
        }));
    } catch (err) {
        console.error('Error fetching products:', err);
    }

    return (
        <div className="categories">
            <h1>Category: {categoryName}</h1>
            <ProdList product_categories={products} />
        </div>
    );
}
