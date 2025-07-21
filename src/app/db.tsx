import {createClient} from '@supabase/supabase-js';
import { use } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_KEY!;
export const supabase=createClient(supabaseUrl, supabaseKey);

export type Customer = {
  customer_id?: number;
  name?: string;
  surname?: string;
  phone_number?: number;
  username?: string;
  email?: string;
  password?: string;
};

export type Drug = {
  drug_id?: number;
  price?: number;
  stock?: number;
  name?: string;
  visible?: boolean;
  category_id?: number;
  barcode?: string;
  thumbnail_id?: number;
  description?:string
};

export type Orders = {
  order_id?: number;
  customer_id?: number;
  order_time?: string;
  total?: number;
  status?: string;
};

export type Cart = {
  cart_item_id?: number;
  customer_id?: number;
  drug_id?: number;
  amount_added?: number;
};

export type OrderedDrug = {
  ordered_drug_id?: number;
  order_id?: number;
  drug_id?: number;
  quantity?: number;
  price?: number;
  total?: number;
};

export type Category = {
  category_id?: number;
  category_name?: string;
  total_items?: number;
  category_image?: string;
  category_description?: string;
};

export type Images = {
  img_id?: number;
  imgSrc?: string;
  drug_id?: number;
};


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
    let name:string=JSON.stringify((await API(supabase.from('Customer').select('*').eq('customer_id',customerID)))?.[0].name).slice(1,-1);
    //end of patenta

    return name;
}

export async function Search(text: string){

    let items:Drug[]=await API(supabase.from('Drug').select('*').ilike('name',"%"+text+"%")) ?? [];

    if(items.length==1){

        let categoryName:string=(await API(supabase.from('Category').select('category_name').eq('category_id', items[0].category_id)))[0].category_name ?? [];
        redirect("/Categories/"+categoryName+"/"+items[0].drug_id);
    }
    else{
        console.log(items);
        redirect("/Categories");
    }
}

export async function InsertProduct(barcode: string){
}