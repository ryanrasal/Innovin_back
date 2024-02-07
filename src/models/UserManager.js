const connection = require("../../db");
const { passwordHasher } = require("../services/PasswordHelper");
const Joi = require("joi");

const registrationSchema = Joi.object({
  firstname: Joi.string().regex(/^[a-zA-Z]+$/).required(),
  lastname: Joi.string().regex(/^[a-zA-Z]+$/).required(), 
  username: Joi.string().required(),
  role: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  postalCode: Joi.string().required(),
  city: Joi.string().required(),
});

// fetch All User
async function fetchUser() {
  const sql = "SELECT * FROM user";

  return connection
    .promise()
    .query(sql)
    .then(async ([rows]) => {
      return { status: 200, message: rows };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}
// fetch All User WHERE role = user
async function fetchUserWithoutRoleAdmin() {
  const sql = "SELECT * FROM user WHERE role = 'user'";

  return connection
    .promise()
    .query(sql)
    .then(async ([rows]) => {
      return { status: 200, message: rows };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

// fetch One User
async function fetchOneUser(id) {
  const sql = `SELECT * FROM user where id = ${id}`;

  return connection
    .promise()
    .query(sql)
    .then(async ([rows]) => {
      if (rows.length === 0) {
        return { status: 404, message: "Utilisateur non trouvé" };
      }
      return { status: 200, message: rows[0] };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

// Create user and Create him cart
async function insertUser(data) {
  const { error } = registrationSchema.validate(data);

  if (error) {
    console.log("Validation error:", error);
    return {
      status: 400,
      message: error.details.map((detail) => detail.message),
    };
  }

  const checkEmailQuery =
    "SELECT COUNT(*) AS emailCount FROM user WHERE email = ?";
    
    const [emailCheckResult] = await connection
    .promise()
    .query(checkEmailQuery, [data.email]);
    const emailExists = emailCheckResult[0].emailCount > 0;
    
    if (emailExists) {
      return { status: 409, message: "Email already exists" };
    }
    
    data.password = await passwordHasher(data.password);
    let bodyResponse = { ...data };
    
    const insertUserQuery =
      "INSERT INTO user (firstname, lastname, username, role, email, password, address, phone, postalCode, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  try {
    const [rows] = await connection.promise().query(insertUserQuery, Object.values(data));

    bodyResponse.id = rows.insertId;
    let postCartQuery = `INSERT INTO cart (is_order, user_id) VALUES ('0', ${bodyResponse.id})`;
    await connection.promise().query(postCartQuery);

    return { status: 201, message: bodyResponse };
  } catch (error) {
    console.error("Database insertion error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}


// Delete User
async function deleteUser(id) {
  let sqlQuery = `DELETE FROM user where id = ${id}`;

  return connection
    .promise()
    .query(sqlQuery)
    .then(async () => {
      return { status: 200, message: {} };
    })
    .catch((error) => {
      return { status: 500, message: error };
    });
}

//Update User
async function updateUser(id, newData) {
  const checkEmailQuery =
    "SELECT COUNT(*) AS emailCount FROM user WHERE email = ? AND id != ?";
  const updateUserQuery =
    "UPDATE user SET firstname = ?, lastname = ?, username = ?, email = ?, address = ?, postalCode = ?, city = ?, phone = ? WHERE id = ?";
  const selectUserQuery = "SELECT * FROM user WHERE id = ?";

  const [emailCheckResult] = await connection
    .promise()
    .query(checkEmailQuery, [newData.email, id]);
  const emailExists = emailCheckResult[0].emailCount > 0;

  if (emailExists) {
    return { status: 409, message: "Email already exists" };
  }

  await connection
    .promise()
    .query(updateUserQuery, [
      newData.firstname,
      newData.lastname,
      newData.username,
      newData.email,
      newData.address,
      newData.postalCode,
      newData.city,
      newData.phone,
      id,
    ]);

  const [updatedUserData] = await connection
    .promise()
    .query(selectUserQuery, [id]);

  return { status: 200, message: { userConnect: updatedUserData[0] } };
}

module.exports = {
  fetchUser,
  fetchOneUser,
  insertUser,
  deleteUser,
  fetchUserWithoutRoleAdmin,
  updateUser,
};
