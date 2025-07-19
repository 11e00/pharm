import {createClient} from "@supabase/supabase-js";
import LoadProduct from "./clientFunctions";
const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase=createClient(supabaseUrl, supabaseKey);

export default async function ProductPage({params}:{params:{product:string}}) {
    //TODO line below fix await error
    const productID=params.product;
        let product = [];

    try{
        let { data:productArr, error:apiError }=await supabase
            .from('Drug')
            .select('*').eq('drug_id', productID);

        if(apiError) throw apiError;
        product=productArr ?? [];
    }catch(err){
        //network error
        console.error(err);
    }

    //const relatedProducts = await
    //const pages = await 

    return (
        <div className="product">
            <LoadProduct       
                product={product}
                //relatedProducts={relatedProducts}
                //pages={pages}
                />
        </div>
    );
}