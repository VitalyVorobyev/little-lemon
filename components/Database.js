import * as SQLite from 'expo-sqlite';

let db;
async function openDatabase() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('little_lemon');
  }
  return db;
}

export async function createTable() {
  const db = await openDatabase();
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS menuitems (
        id INTEGER PRIMARY KEY NOT NULL, 
        name TEXT, 
        price REAL, 
        description TEXT, 
        image TEXT, 
        category TEXT
      );
    `);
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

export async function getMenuItems() {
  const db = await openDatabase();
  try {
    let result = [];
    await db.withTransactionAsync(async () => {
      result = await db.getAllAsync('select * from menuitems');
    });
    return result;
  } catch (error) {
    console.error('Error getting menu items:', error);
  }
}

export async function saveMenuItems(menuItems) {
  const db = await openDatabase();
  try {
    await db.withTransactionAsync(async () => {
      for (const item of menuItems) {
        await db.runAsync(
          `INSERT INTO menuitems (name, price, description, image, category) VALUES (?, ?, ?, ?, ?);`,
          [item.name, item.price, item.description, item.image, item.category]
        );
      }
    });
  } catch (error) {
    console.error('Error saving menu items:', error);
  }
}

export async function filterByQueryAndCategories(query, activeCategories) {
  const db = await openDatabase();
  try {
    let sql = 'SELECT * FROM menuitems WHERE name LIKE ?';
    let params = [`%${query}%`];

    if (activeCategories.length > 0) {
      const lowerCategories = activeCategories.map(cat => cat.toLowerCase());
      const placeholders = lowerCategories.map(() => '?').join(', ');
      sql += ` AND LOWER(category) IN (${placeholders})`;
      params = params.concat(lowerCategories);
    }

    const result = await db.getAllAsync(sql, params);
    console.log('result', result);
    return result;
  } catch (error) {
    console.error('Error filtering menu items:', error);
  }
}
