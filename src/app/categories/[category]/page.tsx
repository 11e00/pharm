import { createClient } from "@supabase/supabase-js";
import LoadProducts from "./clientFunctions";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

//TODO Make "All-items" return all items
export default async function CategoryPage({ params }: { params: { category: string } }) {
    const categoryName = params.category;        
    let categoryID:any = [];
    let products:any=[];

    try {
        const { data: categoryIDdata, error: apiError } = await supabase
            .from('Category')
            .select('category_id')
            .eq('category_name', categoryName);

        if (apiError) throw apiError;
        categoryID=categoryIDdata[0].category_id ?? [];

    } catch (err) {
        //network error
        console.error(err);
    }

    switch(categoryID){
        case 1:
            console.log("bruh")
            try {
                const { data: productArr, error: apiError } = await supabase
                    .from('Drug')
                    .select('drug_id, name, price, stock, visible, Category!inner(category_name, category_id)');

                if (apiError) throw apiError;
                products=productArr ?? [];

            } catch (err) {
                console.error('Error fetching products:', err);
            }
            break;

        default:
            try {
                const { data: productArr, error: apiError } = await supabase
                    .from('Drug')
                    .select('drug_id, name, price, stock, visible, Category!inner(category_name, category_id)')
                    .eq('Category.category_name', categoryName);

                if (apiError) throw apiError;
                products=productArr ?? [];

            } catch (err) {
                console.error('Error fetching products:', err);
            }
            break;
    }
    return (
        <LoadProducts currentCategory={categoryName} products={products} />
    );
}
