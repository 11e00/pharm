import {createClient} from "@supabase/supabase-js";
import LoadCategories from "./clientFunctions";
import {supabase,API} from "../db";

export default async function Categories() {
    let categories=await API(supabase.from('Category').select('*').order('category_id', { ascending: true }))?? [];
    
  return (
    <LoadCategories categories={categories}/>
  );
}