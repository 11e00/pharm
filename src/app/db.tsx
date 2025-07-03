import {createClient} from '@supabase/supabase-js';
import { use } from 'react';
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
    let items=null;
    try{
        let { data:items, error:apiError }=await supabase.from('Drugs').select('*').like('name',text);
        console.log(items);

        if(apiError)
            //database error
            console.error(apiError);
    }catch(err){
        //network error
        console.error(err);
    }
    
    return items;
}