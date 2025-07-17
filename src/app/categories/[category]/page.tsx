import {createClient} from "@supabase/supabase-js";
import CategoryList from "@/app/categories/clientFunctions";
import ProdList from "@/app/categories/[category]/clientFunctions";
const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase=createClient(supabaseUrl, supabaseKey);``

export default async function CategoryPage(/*{url}:{url:{category:string}}*/) {
    //const categoryName=url.category;
    //console.log(categoryName);
    let category = [];

    try{
        let { data:productArr, error:apiError }=await supabase
            .from('Category')
            .select('*');
        console.log(productArr);

        if(apiError) throw apiError;
        category=productArr ?? [];
    }catch(err){
        //network error
        console.error(err);
    }

    

    return (
        <div className="categories">
            <h1>Categories fueh</h1>
            {/*<ProdList product_categories={category ?? []} />*/}
        </div>
    );
}