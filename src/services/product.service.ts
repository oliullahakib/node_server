import fs from "fs"
import path from "path"
import type { IProduct } from "../types/product";
const uri = path.join(process.cwd(),"./src/database/db.json")
const productService = ()=>{
  const result = fs.readFileSync(uri,"utf-8")
  return JSON.parse(result)
}
const insertProduct =(products:IProduct[])=>{
fs.writeFileSync(uri,JSON.stringify(products))
}
export {productService,insertProduct}