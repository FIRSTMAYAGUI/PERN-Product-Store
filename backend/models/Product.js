import { sql } from "../config/db.js";

export const createProductTable = async () => {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;

    //console.log('table created')
  } catch (error) {
    console.log('error:', error)
    return error.message
  }
}

export const insertProduct = async (name, price, image) => {
    try {
        const createdProduct = await sql`
            INSERT INTO products(name, price, image) VALUES(${name}, ${price}, ${image})
        `;
        return createdProduct
    } catch (error) {
        return error.message
    }
}

export const fetchProducts = async () => {
    try {
        const products = await sql`
            SELECT * FROM products ORDER BY created_at DESC
        `
        return products
    } catch (error) {
        return error.message
    }
}

export const updateProduct = async (id, name, price, image) => {
    try {
        const updated = await sql`
            UPDATE products
            SET name=${name}, price=${price}, image=${image}
            WHERE id=${id}
            RETURNING *
        `
        return updated
    } catch (error) {
        console.log("Id not found") 
        return error.message
    }
}

export const deleteProduct = async (id) => {
    try {
        const deleted = await sql`
            DELETE FROM products WHERE id = ${id}
        `
        return deleted
    } catch (error) {
        console.log("Id not found")
        return error.message
    }
}

export const isValidId = async (id) => {
    try {
        const Id = await sql`
            SELECT id FROM products WHERE id = ${id}
        `
        console.log("valid Id:", Id)
        return Id
    } catch (error) {
        console.log("Id not valid")
        return error.message
    }
}
