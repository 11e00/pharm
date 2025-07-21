import { createClient } from "@supabase/supabase-js";
import LoadProducts from "./clientFunctions";
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import {supabase,API, Drug, Images} from "@/app/db";

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const urlCategoryName = params.category;

    let categoryName:string=(await API(supabase.from('Category').select('category_name').eq('category_name', urlCategoryName)))[0]?.category_name;
    
    if(urlCategoryName!=categoryName)
        notFound();

    let categoryID:number=(await API(supabase.from('Category').select('category_id').eq('category_name', urlCategoryName)))[0]?.category_id;

    let products:Drug[]=[];
    switch(categoryID){
        case 1:
            products=await API(supabase.from('Drug').select('drug_id, name, price, thumbnail_id, stock, visible, Category!inner(category_id, category_name)')) ?? [];
            break;
        default:
            products=await API(supabase.from('Drug').select('drug_id, name, price, thumbnail_id, stock, visible, Category!inner(category_id, category_name)').eq('category_id', categoryID)) ?? [];
            break;
    }

    let images:string[]=[];
    for(let i=0;i<products.length;i++){
        images[i]=(await API(supabase.from('Images').select('*').eq('img_id', products[i].thumbnail_id)))[0]?.imgSrc ?? [];
    }

    return (
        <LoadProducts currentCategory={urlCategoryName} products={products} images={images}/>
    );
}
