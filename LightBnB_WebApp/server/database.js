require('dotenv').config();
const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const sql = `SELECT id, name, email, password 
  FROM users
  WHERE email = $1;`;
  return pool.query(sql, [email]).then(res => res.rows[0]);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const sql = `SELECT id, name, email, password 
  FROM users
  WHERE id = $1;`;
  return pool.query(sql, [id]).then(res => res.rows[0]);
  //return Promise.resolve(users[id]);
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name, password, email}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const sqlParams = [user.name, user.email, user.password];
  const sql = `INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3) RETURNING *`;
  return pool.query(sql, sqlParams).then(res => res.rows[0]);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const sqlParams = [guest_id, limit];
  const sql = `SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
  FROM reservations
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1
  AND now()::date > end_date
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date DESC
  LIMIT $2;`;

  return pool.query(sql, sqlParams).then(res => res.rows);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const sqlParams = [];
  let sqlWhereClauseArray = [];
  let sqlWhereString = "";
  
  if (options.city) {
    sqlParams.push(`%${options.city}%`);
    sqlWhereClauseArray.push(`properties.city LIKE $${sqlParams.length}`);
  }

  if (options.owner_id) {
    sqlParams.push(options.owner_id);
    sqlWhereClauseArray.push(`properties.owner_id = $${sqlParams.length}`);
  }
  
  if (options.minimum_price_per_night) {
    sqlParams.push(options.minimum_price_per_night * 100);
    sqlWhereClauseArray.push(`properties.cost_per_night >= $${sqlParams.length}`);
  }

  if (options.maximum_price_per_night) {
    sqlParams.push(options.maximum_price_per_night * 100);
    sqlWhereClauseArray.push(`properties.cost_per_night <= $${sqlParams.length}`);
  }

  if (sqlWhereClauseArray.length > 0) {
    sqlWhereString = ` WHERE ${sqlWhereClauseArray.join(' AND ')}`;
  }
  let sqlHavingClause = "";
  if (options.minimum_rating) {
    sqlParams.push(options.minimum_rating);
    sqlHavingClause = ` HAVING avg(property_reviews.rating) >= $${sqlParams.length}`;
  }
  sqlParams.push(limit);
  
  const sql = `SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  ${sqlWhereString ? sqlWhereString : ""}
  GROUP BY properties.id
  ${sqlHavingClause ? sqlHavingClause : ""}
  ORDER BY cost_per_night
  LIMIT $${sqlParams.length};`;

  return pool.query(sql, sqlParams).then(res => res.rows);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  const sqlParams = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.country,
    property.street,
    property.city,
    property.province,
    property.post_code
  ];

  const sql = `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night,
    parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;
    
  return pool.query(sql, sqlParams).then(res => res.rows);
};
exports.addProperty = addProperty;
