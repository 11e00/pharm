import {createClient} from '@supabase/supabase-js';
import { use } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabase=createClient(supabaseUrl, supabaseKey);

export async function Name(customerID:number){

    let name="";

    try{
        let { data:customer, error:apiError }=await supabase.from('Customer').select('*').eq('customer_id',customerID);
        console.log(customer);

        //patenta
        name=JSON.stringify(customer?.[0].name).slice(1,-1);
        //end of patenta

        if(apiError)
            //database error
            console.error(apiError);
    }catch(err){
        //network error
        console.error(err);
    }

    return name;
}

export async function Search(text: string){
    let items:any=[];
    let categoryName:any=[];
    try{
        let { data:itemsData, error:apiError }=await supabase.from('Drug').select('*').ilike('name',"%"+text+"%");
        
        if(apiError) throw apiError;
        items=itemsData ?? [];
    }catch(err){
        //network error
        console.error(err);
    }

    if(items.length==1){
        try {
            const { data: categoryNameData, error: apiError } = await supabase
                .from('Category')
                .select('category_name')
                .eq('category_id', items[0].category_id);

            if (apiError) throw apiError;
            categoryName=categoryNameData[0].category_name ?? [];
        } catch (err) {
            //network error
            console.error(err);
        }

        redirect("/categories/"+categoryName+"/"+items[0].drug_id);
    }
    else{
        console.log(items);
        redirect("/categories");
    }
}

export async function InsertProduct(barcode: string){
}