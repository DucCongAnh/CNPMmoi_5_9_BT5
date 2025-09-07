const connection = require('../config/database');

const User = {
    /**
     * Finds a user by their email address.
     * @param {string} email
     * @returns {Promise<object|null>} The user object if found, otherwise null.
     */
    findByEmail: async (email) => {
        try {
            const conn = await connection();
            const [rows] = await conn.execute(
                'SELECT * FROM users WHERE email = ?', [email]
            );
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    },

    /**
     * Creates a new user in the database.
     * @param {object} userData
     * @returns {Promise<object>} The new user object.
     */
    create: async (userData) => {
        const {
            name,
            email,
            password,
            role
        } = userData;
        try {
            const conn = await connection();
            const [result] = await conn.execute(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]
            );
            return {
                id: result.insertId,
                ...userData
            };
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
};

module.exports = User;