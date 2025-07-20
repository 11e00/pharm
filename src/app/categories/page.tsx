import {createClient} from "@supabase/supabase-js";
import LoadCategories from "./clientFunctions";
import {supabase,trySupabase} from "../db";

export default async function Categories() {
    let categories=await trySupabase(supabase.from('Category').select('*').order('category_id', { ascending: true }))?? [];
    
  return (
    <LoadCategories categories={categories}/>
  );
}