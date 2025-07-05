import {createClient} from "@supabase/supabase-js";
import CategoryList from "@/app/categories/clientFunctions";
import ProdList from "@/app/categories/category/clientFunctions";
const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase=createClient(supabaseUrl, supabaseKey);``

export default async function productsCategories() {
    let product_categories = [];

    try{
        let { data:product_category, error:apiError }=await supabase
            .from('Drugs')
            .select('*');
        console.log(product_category);

        if(apiError) throw apiError;
        product_categories=product_category ?? [];
    }catch(err){
        //network error
        console.error(err);
    }


    return (
        <div className="categories">
            <h1>Categories fueh</h1>
            <ProdList product_categories={product_categories ?? []} />
        </div>
    );
}