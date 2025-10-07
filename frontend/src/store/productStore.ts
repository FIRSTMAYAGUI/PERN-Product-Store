import { create } from "zustand";
import {  type Product, type CreateProduct } from "../types/product";

const API_BASE_URL ="http://localhost:5000/api"

interface ProductStore {
  products: Product[];
  fetchProducts: () => Promise<{ success: boolean; message: string }>;
  createProduct: (newProduct: CreateProduct) => Promise<{ success: boolean; message: string }>;
  updateProduct: (productToUpdate: Product, id: number) => Promise<{ success: boolean; message: string }>;
  deleteProduct: (id: number) => Promise<{ success: boolean; message: string }>;
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (products)=>set({products}),

    createProduct: async (newProduct: CreateProduct)=>{

        //check if all fields are not empty
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return { success: false, message: "Please fill in all fields" }
        }
        //fetch the data from the server
        const res = await fetch(`${API_BASE_URL}/product`, {
            method: "POST",
            headers : {
                "Content-Type" : "application/json" 
            },
            body:JSON.stringify(newProduct) //converts the object (newProduct) to a json string
        })

        //convert the response to a json format
        const data = await res.json();
        set((state) => ({ products: [ ...state.products, data.data ] }));
        return { success: true, message: "Product created successfully" }
    },

    fetchProducts : async () => {
        const res = await fetch(`${API_BASE_URL}/product`, {
            method: "GET"
        });

        if (!res){
           return {
                success: false, message: "Error while fetching Products"
            } 
        }

        const productData = await res.json();
        set({products: productData.data});
        
        return {
            success: true, message: "Products fetched successfully"
        }
    },

    updateProduct: async (productToUpdate: Product, productId: number)=>{

        if(!productToUpdate.name || !productToUpdate.price || !productToUpdate.image){
            return { success: false, message: "Please fill in all fields" }
        };

        const res = await fetch(`${API_BASE_URL}/product/${productId}`, {
            method:"PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(productToUpdate)
        });

        if(!res){
            return {
                success: false, message: "Error while updating the product. Try again later"
            }
        };

        const updatedProduct = await res.json();

        if(updatedProduct.success !== true){
            return {
                success: false, message: updatedProduct.message
            }
        }

        //updates the product
        set((state) => ({
            products: state.products.map((product: Product)=>product.id === productId ? updatedProduct.data[0] : product)
        }))

        return {
            success: true, message: "Product updated successfully"
        }
    },

    deleteProduct: async (productId: number)=>{
        const res = await fetch(`${API_BASE_URL}/product/${productId}`, {
            method: "DELETE",
        });

        if(!res){
            return {
                success: false, message: "Error while deleting the product. Try again later"
            }
        };

        const data = await res.json();

        if(data.success !== true){
            return {
                success: false, message: data.message
            }
        };

        //updates the products
        set((state) => ({ 
            products: state.products.filter((product: Product) => (product.id !== productId))
        }));

        return {
            success: true, message: data.message
        }
    }

}))
