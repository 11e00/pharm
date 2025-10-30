import {createClient} from "@supabase/supabase-js";
import { notFound } from 'next/navigation';
import LoadProduct from "./clientFunctions";
import {supabase,API, item, item_images} from "@/app/db";


export default async function ProductPage({params}:{params:{product:string}}) {
    //TODO line below fix await error
    const urlProductID=params.product;

    let productID:number=(await API(supabase.from('item').select('item_id').eq('item_id', urlProductID)))[0]?.item_id;

    if(urlProductID!=productID.toString())
        notFound();

    let product:item[]=await API(supabase.from('item').select('*').eq('item_id', productID)) ?? [];

    let item_images:item_images[]=await API(supabase.from('item_images').select('*').eq('item_id', productID)) ?? [];


    //const relatedProducts = await
    //const pages = await 

    return (
        <div className="product">
            <LoadProduct       
                product={product} item_images={item_images}
                //relatedProducts={relatedProducts}
                //pages={pages}
                />
        </div>
    );
}