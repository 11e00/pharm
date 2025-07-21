import {createClient} from '@supabase/supabase-js';
import { use } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_KEY!;
export const supabase=createClient(supabaseUrl, supabaseKey);

export async function API(call:any) {
    try {
        const { data, error } = await call;

        if (error) throw error;
        return data;

    } catch (err) {
        console.error('error:', err);
        return err;
    }
}

export async function Name(customerID:number){

    //patenta
    let name=JSON.stringify((await API(supabase.from('Customer').select('*').eq('customer_id',customerID)))?.[0].name).slice(1,-1);
    //end of patenta

    return name;
}

export async function Search(text: string){
    let categoryName:any=[];

    let items=await API(supabase.from('Drug').select('*').ilike('name',"%"+text+"%")) ?? [];

    if(items.length==1){

        categoryName=(await API(supabase.from('Category').select('category_name').eq('category_id', items[0].category_id)))[0].category_name ?? [];
        redirect("/categories/"+categoryName+"/"+items[0].drug_id);
    }
    else{
        console.log(items);
        redirect("/categories");
    }
}

export async function InsertProduct(barcode: string){
}