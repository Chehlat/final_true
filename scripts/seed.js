const { db } = require("@vercel/postgres");

const {
  users,
  products,
  salesrecords,
  sellers,
  revenue,
} = require("../app/lib/placeholder-data");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
          );
        `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
            INSERT INTO users (id, name, email, password)
            VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
          `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedSellers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql` 
        CREATE TABLE IF NOT EXISTS Sellers (
         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
         organization VARCHAR(100) NOT NULL,
         address VARCHAR(255),
         phone BIGINT,  
         checking_account BIGINT,
        name_of_representative VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `;

    console.log('Created "Sellers" table');
    const insertedSellers = await Promise.all(
      sellers.map(
        (seller) => client.sql`
            INSERT INTO Sellers (organization, address, phone, checking_account, name_of_representative)
            VALUES ('${seller.organization}', '${seller.address}', ${seller.phone}, ${seller.checking_account}, '${seller.name_of_representative}')
            ON CONFLICT (id) DO NOTHING;
             `
      )
    );
    console.log(`Seeded ${insertedSellers.length} sellers`);
    return {
      createTable,
      sellers: insertedSellers,
    };
  } catch (error) {
    console.error("Error seeding profs:", error);
    throw error;
  }
}
async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS Products  (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(100) NOT NULL,
            cost DECIMAL(10, 2) NOT NULL,
            date_of_manufacturing DATE,
            manufacturer VARCHAR(100),
            units VARCHAR(50),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
               `;
    const insertedProducts = await Promise.all(
      products.map(
        (product) => client.sql`
                    INSERT INTO Products (name, cost, date_of_manufacturing, manufacturer, units)
                    VALUES ('${product.name}', ${product.cost}, '${product.date_of_manufacturing}', '${product.manufacturer}', '${product.units}')
                    ON CONFLICT (id) DO NOTHING;
                   `
      )
    );
    console.log(`Seeded ${insertedProducts.length} products`);
    return {
      createTable,
      products: insertedProducts,
    };
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}

async function seedSalesrecords(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS SalesRecords  (
       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      product_id UUID,
      transaction_id VARCHAR(50) NOT NULL,
      date_of_purchase DATE NOT NULL,
      quantity INT NOT NULL,
      total_cost DECIMAL(10, 2) NOT NULL,
      seller_id UUID,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (seller_id) REFERENCES Sellers(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
      `;
    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding sales records:", error);
    throw error;
  }
}
async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error("Error seeding revenue:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedProducts(client);
  await seedSellers(client);
  await seedSalesrecords(client);
  //   await seedUsers(client);
  await seedRevenue(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
