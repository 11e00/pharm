import { createClient } from "@supabase/supabase-js";
import LoadProducts from "./clientFunctions";
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import {supabase,API, item, item_images} from "@/app/db";

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const urlCategoryName = params.category;

    const categoryName:string=(await API(supabase.from('category').select('category_name').eq('category_name', urlCategoryName)))[0]?.category_name;
    
    if(urlCategoryName!=categoryName)
        notFound();

    const categoryID:number=(await API(supabase.from('category').select('category_id').eq('category_name', urlCategoryName)))[0]?.category_id;

    let products:item[]=[];
    switch(categoryID){
        case 1:
            products=await API(supabase.from('item').select('item_id, name, price, thumbnail_id, stock, visible, category!inner(category_id, category_name)')) ?? [];
            break;
        default:
            products=await API(supabase.from('item').select('item_id, name, price, thumbnail_id, stock, visible, category!inner(category_id, category_name)').eq('category_id', categoryID)) ?? [];
            break;
    }

    const item_images:string[]=[];
    for(let i=0;i<products.length;i++){
        item_images[i]=(await API(supabase.from('item_images').select('*').eq('img_id', products[i].thumbnail_id)))[0]?.imgSrc ?? [];
    }

    return (
        <LoadProducts currentCategory={urlCategoryName} products={products} item_images={item_images}/>
    );
}
