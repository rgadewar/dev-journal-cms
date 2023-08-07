const path = require('path');

async function seedDatabase() {
  try {
    console.log('Seeding the database...');

    // Load the seed functions in the desired order from index.js
    const seedFunctions = require('./index');

    for (const seedFunctionName in seedFunctions) {
      console.log(`Running seed function: ${seedFunctionName}`);
      await seedFunctions[seedFunctionName]();
    }

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
}

module.exports = seedDatabase;
