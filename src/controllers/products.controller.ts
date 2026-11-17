import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, productService } from "../services/product.service";
import type { IProduct } from "../types/product";
import sendResponse from "../utils/sendResponse";
import bodyParser from "../utils/bodayParser";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  const params = url?.split("/");
  const id = params && params[1] === "products" ? Number(params[2]) : null;
  //get all products
  if (url === "/products" && method === "GET") {
    const products: IProduct[] = productService();
    sendResponse(res, 200, true, "Get All products Succussfully", products);
  } else if (method === "GET" && id != null) {
    const products: IProduct[] = productService();
    const singleProduct = products.find((p: IProduct) => p.id === id);
    sendResponse(
      res,
      200,
      true,
      "Get A Single product Succussfully",
      singleProduct,
    );
  } else if (url === "/products" && method === "POST") {
    const body = await bodyParser(req);
    const products: IProduct[] = productService();
    const newProduct: IProduct = { id: Number(new Date()), ...body };
    products.push(newProduct);
    insertProduct(products);
    sendResponse(res, 201, true, "Product Created successfully", products);
  } else if (method === "PUT" && id != null) {
    const products = productService();
    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      sendResponse(res, 404, false, "Product not found");
    } else {
      try {
        const body = await bodyParser(req);
        products[index] = { id: products[index].id, ...body };
        console.log(products);
        insertProduct(products);
        sendResponse(res, 200, true, "Product Updated successfully");
      } catch (error) {
        sendResponse(res, 500, false, "Somthing went wrong");
      }
    }
  } else if (method === "DELETE" && id != null) {
    const products:IProduct[] = productService();
    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      sendResponse(res, 404, false, "Product not found");
    } else {
    products.splice(index,1)
    insertProduct(products)
    sendResponse(res, 200, true, "Product Deleted successfully");
    }
  } else {
    sendResponse(res, 404, false, "This route is not define");
  }
};

export default productController;
