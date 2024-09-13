const connection = require('./connection');
const format = require('../utils/generateFormattedQuery');

const searchEveryProduct = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

const searchProductById = async (productId) => {
  const [[product]] = await connection
    .execute('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
};

const registerProduct = async (newProduct) => {
  try {
    const columns = format.getFormattedColumnNames(newProduct);
    const placeholders = format.getFormattedPlaceholders(newProduct);
    const query = `INSERT INTO products (${columns}) VALUE (${placeholders});`;
    
    await connection
      .execute(query, [...Object.values(newProduct)]);
    
    const [[{ id }]] = await connection.execute('SELECT LAST_INSERT_ID() AS id');
    
    return { id, ...newProduct };
  } catch (error) {
    return new Error(error.message);
  }
};

const updateProduct = async (update, productId) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?', 
    [update.name, productId],
  );

  return affectedRows;
};

const deleteProduct = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?', 
    [productId],
  );

  return affectedRows;
};

const searchProductName = async (query) => {
  const [response] = await connection.execute(
    'SELECT * FROM products WHERE name LIKE ?', 
    [`%${query}%`],
  );

  return response;
};

module.exports = {
  searchEveryProduct,
  searchProductById,
  registerProduct,
  updateProduct,
  deleteProduct,
  searchProductName,
};
