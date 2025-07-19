import {createClient} from "@supabase/supabase-js";
import { notFound } from 'next/navigation';
import LoadProduct from "./clientFunctions";

const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase=createClient(supabaseUrl, supabaseKey);

export default async function ProductPage({params}:{params:{product:string}}) {
    //TODO line below fix await error
    const urlProductID=params.product;
    let productID:any = [];
    let product = [];
    let images:any=[];


    try {
        const { data: productIDData, error: apiError } = await supabase
            .from('Drug')
            .select('drug_id')
            .eq('drug_id', urlProductID);

        if (apiError) throw apiError;
        productID=productIDData[0]?.drug_id ?? [];

    } catch (err) {
        //network error
        console.error(err);
    }

    if(urlProductID!=productID)
        notFound();

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

    try {
        const { data: imgArr, error: apiError } = await supabase
            .from('Images')
            .select('*')
            .eq('drug_id', productID);

        if (apiError) throw apiError;
        images=imgArr ?? [];
    } catch (err) {
        console.error('Error fetching products:', err);
    }

    //const relatedProducts = await
    //const pages = await 

    return (
        <div className="product">
            <LoadProduct       
                product={product} images={images}
                //relatedProducts={relatedProducts}
                //pages={pages}
                />
        </div>
    );
}