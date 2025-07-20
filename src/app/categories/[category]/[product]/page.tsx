import {createClient} from "@supabase/supabase-js";
import { notFound } from 'next/navigation';
import LoadProduct from "./clientFunctions";
import {supabase,trySupabase} from "@/app/db";


export default async function ProductPage({params}:{params:{product:string}}) {
    //TODO line below fix await error
    const urlProductID=params.product;

    let productID=(await trySupabase(supabase.from('Drug').select('drug_id').eq('drug_id', urlProductID)))[0]?.drug_id ?? [];

    if(urlProductID!=productID)
        notFound();

    let product=await trySupabase(supabase.from('Drug').select('*').eq('drug_id', productID)) ?? [];

    let images=await trySupabase(supabase.from('Images').select('*').eq('drug_id', productID)) ?? [];


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