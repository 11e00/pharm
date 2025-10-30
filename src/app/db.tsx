import {createClient} from '@supabase/supabase-js';
import { use } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const supabaseUrl=process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey=process.env.NEXT_PUBLIC_SUPABASE_KEY!;
export const supabase=createClient(supabaseUrl, supabaseKey);

export type customer = {
  customer_id?: number;
  name?: string;
  surname?: string;
  phone_number?: number;
  username?: string;
  email?: string;
  password?: string;
};

export type item = {
  item_id?: number;
  price?: number;
  stock?: number;
  name?: string;
  visible?: boolean;
  category_id?: number;
  barcode?: string;
  thumbnail_id?: number;
  description?:string;
};

export type orders = {
  order_id?: number;
  customer_id?: number;
  order_time?: string;
  total?: number;
  status?: string;
};

export type cart = {
  cart_item_id?: number;
  customer_id?: number;
  item_id?: number;
  amount_added?: number;
};

export type ordered_items = {
  ordered_item_id?: number;
  order_id?: number;
  item_id?: number;
  quantity?: number;
  price?: number;
  total?: number;
};

export type category = {
  category_id?: number;
  category_name?: string;
  total_items?: number;
  category_image?: string;
  category_description?: string;
};

export type item_images = {
  img_id?: number;
  imgSrc?: string;
  item_id?: number;
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

export async function Name(customerInstanceID:number){

    //patenta
    let name:string=JSON.stringify((await API(supabase.from('customer').select('*').eq('customer_instance_id',customerInstanceID)))?.[0].name).slice(1,-1);
    //end of patenta

    return name;
}

export async function Search(text: string){

    let items:item[]=await API(supabase.from('item').select('*').ilike('name',"%"+text+"%")) ?? [];

    if(items.length==1){

        let categoryName:string=(await API(supabase.from('category').select('category_name').eq('category_id', items[0].category_id)))[0].category_name ?? [];
        redirect("/categories/"+categoryName+"/"+items[0].item_id);
    }
    else{
        console.log(items);
        redirect("/categories");
    }
}

export async function InsertProduct(barcode: string){
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

// Logout action
export async function logout() {
  await supabase.auth.signOut();

  redirect("/logout");
}