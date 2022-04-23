const fs = require("fs")
const path = require("path")

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'card.json'
);

module.exports = class Card {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {

      let card = { products: [], totalPrice: 0 };
      if(!err) {
        card = JSON.parse(fileContent);
      }

      const existingProductIndex = card.products.findIndex(prod => prod.id === id);
      const existingProduct = card.products[existingProductIndex];
      let updateProduct;
      if(existingProduct) {
        updateProduct = {...existingProduct};
        updateProduct.qty = updateProduct.qty + 1;
        card.products = [...card.products];
        card.products[existingProductIndex] = updateProduct;
      }
      else {
        updateProduct = {id: id, qty : 1};
        card.products = [...card.products, updateProduct];
      }

      card.totalPrice = card.totalPrice + productPrice;
    });
  }


}