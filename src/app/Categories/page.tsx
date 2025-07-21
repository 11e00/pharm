import {createClient} from "@supabase/supabase-js";
import LoadCategories from "./clientFunctions";
import {supabase,API, Category} from "../db";

export default async function Categories() {
    let categories:Category[]=await API(supabase.from('Category').select('*').order('category_id', { ascending: true }))?? [];
    
  return (
    <LoadCategories categories={categories}/>
  );
}