
const fs = require('fs').promises;

let lastProductId = 0;

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    generateId() {

        lastProductId++;
        return lastProductId;
    }

    async addProduct(data) {
        if (
            !data.title ||
            !data.description ||
            !data.price ||
            !data.thumbnail ||
            !data.stock ||
            !data.code
        ) {
            return "Error: Campos incorrectos";
        }

        try {
            await this.loadProductsFromFile();

            const product = {
                id: this.generateId(), 
                title: data.title,
                description: data.description,
                price: data.price,
                thumbnail: data.thumbnail,
                code: data.code,
                stock: data.stock,
            };

            this.products.push(product);

            await this.saveProductsToFile();

            return product;
        } catch (error) {
            console.log("Error: No se pudo agregar el producto", error);
            return "Error: No se pudo agregar el producto";
        }
    }

    async getProducts() {
        try {
            await this.loadProductsFromFile();
            return this.products;
        } catch (error) {
            console.log("Error: No se pudieron obtener los productos", error);
            return "Error: No se pudieron obtener los productos";
        }
    }

    async getProductById(id) {
        try {
            await this.loadProductsFromFile();
            const product = this.products.find((product) => product.id === id);
            if (!product) {
                console.log("Error: Producto no encontrado");
                return "Error: Producto no encontrado";
            }
            return product;
        } catch (error) {
            console.log("Error: No se pudo obtener el producto", error);
            return "Error: No se pudo obtener el producto";
        }
    }

    async updateProduct(id, newData) {
        try {
            await this.loadProductsFromFile();
            const productIndex = this.products.findIndex(
                (product) => product.id === id
            );
            if (productIndex === -1) {
                console.log("Error: Producto no encontrado");
                return "Error: Producto no encontrado";
            }

            this.products[productIndex] = {
                ...this.products[productIndex],
                ...newData,
            };

            await this.saveProductsToFile();

            return this.products[productIndex];
        } catch (error) {
            console.log("Error: No se pudo actualizar el producto", error);
            return "Error: No se pudo actualizar el producto";
        }
    }

    async deleteProduct(id) {
        try {
            await this.loadProductsFromFile();
            const productIndex = this.products.findIndex(
                (product) => product.id === id
            );
            if (productIndex === -1) {
                console.log("Error: Producto no encontrado");
                return "Error: Producto no encontrado";
            }

            this.products.splice(productIndex, 1);

            await this.saveProductsToFile();

            return "Producto eliminado correctamente";
        } catch (error) {
            console.log("Error: No se pudo eliminar el producto", error);
            return "Error: No se pudo eliminar el producto";
        }
    }

}

module.exports = ProductManager;