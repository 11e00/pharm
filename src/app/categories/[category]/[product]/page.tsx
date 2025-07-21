import {createClient} from "@supabase/supabase-js";
import { notFound } from 'next/navigation';
import LoadProduct from "./clientFunctions";
import {supabase,API, Drug, Images} from "@/app/db";


export default async function ProductPage({params}:{params:{product:string}}) {
    //TODO line below fix await error
    const urlProductID=params.product;

    let productID:number=(await API(supabase.from('Drug').select('drug_id').eq('drug_id', urlProductID)))[0]?.drug_id;

    if(urlProductID!=productID.toString())
        notFound();

    let product:Drug[]=await API(supabase.from('Drug').select('*').eq('drug_id', productID)) ?? [];

    let images:Images[]=await API(supabase.from('Images').select('*').eq('drug_id', productID)) ?? [];


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