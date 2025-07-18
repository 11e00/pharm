import {createClient} from "@supabase/supabase-js";

const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase=createClient(supabaseUrl, supabaseKey);

export default async function ProductPage({params}:{params:{product:string}}) {
    //TODO line below fix await error
    const productID=params.product;
    
    console.log(productID);
    let product = [];

    try{
        let { data:productArr, error:apiError }=await supabase
            .from('Drug')
            .select('*').eq('drug_id', productID);
        console.log(productArr);

        if(apiError) throw apiError;
        product=productArr ?? [];
    }catch(err){
        //network error
        console.error(err);
    }

    return (
        <div className="product">
            <h1>Product</h1>
            {/*<ProdList product_categories={category ?? []} />*/}
        </div>
    );
}