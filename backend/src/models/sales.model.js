const camelize = require('camelize');
const connection = require('./connection');
const format = require('../utils/generateFormattedQuery');

const searchEverySale = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity FROM sales_products
        INNER JOIN sales
            ON sales_products.sale_id = sales.id`,
  );

  return camelize(sales);
};

const searchSaleById = async (saleId) => {
  const [sale] = await connection
    .execute(
      `SELECT date, product_id, quantity FROM sales 
        INNER JOIN sales_products
            ON sales_products.sale_id = sales.id
                WHERE sales.id = ?    
            ORDER BY sale_id, product_id`, 
      [saleId],
    );
  
  return camelize(sale);
};

const registerSales = async (newSale) => {
  const [ResultSetHeader] = await connection.execute(
    'INSERT INTO sales (id, date) VALUES (DEFAULT, DEFAULT);',
  );
 
  const id = ResultSetHeader.insertId;
  const [saleKeys] = newSale;
  const newSaleInsert = newSale.map((sale) => ({ saleId: id, ...sale })); 
  const saleQuery = { saleId: id, ...saleKeys };
  const columns = format.getFormattedColumnNames(saleQuery);
  const placeholders = format.getFormattedPlaceholders(saleQuery);

  const query = `INSERT INTO sales_products (${columns}) VALUE (${placeholders});`;
  const tableValues = newSaleInsert.map((value) => Object.values(value));

  const insertValues = tableValues.map((insert) => connection.execute(query, insert));
  Promise.all(insertValues);

  return { id, itemsSold: newSale };
};

const deleteSale = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?', 
    [productId],
  );

  return affectedRows;
};

const updateSaleQuantity = async (saleId, productId, quantity) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
  );
  
  return affectedRows; 
};

module.exports = {
  searchEverySale,
  searchSaleById,
  registerSales,
  deleteSale,
  updateSaleQuantity,
};
