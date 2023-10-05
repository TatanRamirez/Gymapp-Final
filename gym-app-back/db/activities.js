const { query } = require('express');
const { getConnection } = require('./db');
const fs = require('fs');

const createActivities = async (
  name,
  description,
  image,
  typology,
  muscleGroup
) => {
  let connection;

  try {
    connection = await getConnection();
    const [newActivities] = await connection.query(
      `
    INSERT INTO activities (activity_name, description, image, typology, muscle_group) VALUES(?,?,?,?,?)
    `,
      [name, description, image, typology, muscleGroup]
    );
    return newActivities.insertId;
  } finally {
    // connection.relese();
  }
};

const getActivities = async (user_id, queryParams) => {
  let connection;

  try {
    const { typology, muscle_group, search } = queryParams;
    connection = await getConnection();

    let sqlQuery =
      'SELECT A.*, COUNT(L.activity_id) AS total_likes, CASE WHEN COUNT(L.activity_id) > 0 THEN 1 ELSE 0 END AS liked FROM activities A';
    let clause = 'WHERE ';
    sqlQuery += ` LEFT JOIN likes L ON A.id = L.activity_id AND L.user_id = ?`;
    const values = [user_id];

    if (typology) {
      sqlQuery += ` ${clause} A.typology LIKE ?`;
      values.push(`%${typology}%`);
      clause = 'AND';
    }

    if (muscle_group) {
      sqlQuery += ` ${clause} A.muscle_group LIKE ?`;
      values.push(`%${muscle_group}%`);
    }

    if (search) {
      sqlQuery += ` ${clause} A.activity_name LIKE ?`;
      values.push(`%${search}%`);
    }

    sqlQuery += ` GROUP BY A.id`;


    const [activities] = await connection.query(sqlQuery, values);

    return activities;
  } finally {
    if (connection) connection.release();
  }
};

const getActivityById = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [resultActivity] = await connection.query(
      `
      SELECT a.*, COUNT(l.id) likes FROM activities a LEFT JOIN likes l ON a.id = l.activity_id WHERE a.id = ? ;
      `,
      [id]
    );
    console.log(resultActivity)
    return resultActivity;
  } finally {
    // if (connection) connection.relese();
  }
};

const deleteById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [resultFind] = await connection.query(
      `
      SELECT image FROM activities WHERE id = ? 
      `,
      [id]
    );
    let pathImage = `./uploads/${resultFind[0].image}`
    if (fs.existsSync(pathImage)) {
      //file exists
      fs.unlinkSync(pathImage);
    }

    await connection.query(
      `
      DELETE FROM likes WHERE activity_id = ? 
      `,
      [id]
    );

    const [resultDelete] = await connection.query(
      `
      DELETE FROM activities WHERE id = ? 
      `,
      [id]
    );


    return resultDelete;
  } finally {
    // if (connection) connection.relese();
  }
};

const modifyActivity = async (
  id,
  updatedActivity
) => {


  let { 
    name,
    description,
    image,
    typology,
    muscleGroup 
  } = updatedActivity;
  let connection;

  try {
    connection = await getConnection();
    console.log(id);

    if (!image) {
      const [resultFind] = await connection.query(
        `
        SELECT image FROM activities WHERE id = ? 
        `,
        [id]
      );
      image = resultFind[0].image
    }

    console.log("image", image)
    const [modifyActivity] = await connection.query(
      `
    UPDATE activities SET activity_name = ?, description = ?, image = ?, typology = ?, muscle_group = ? WHERE id = ?
    `,
      [name, description, image, typology, muscleGroup, id]
    );

    return modifyActivity;
  } finally {
    // if (connection) connection.release();
  }
};

module.exports = {
  modifyActivity,
  deleteById,
  getActivityById,
  createActivities,
  getActivities,
};
