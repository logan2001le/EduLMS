// createTables.js

const db = require('../config/db');

const createTables = async () => {
    try {
        // Tạo bảng "users" nếu chưa tồn tại
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(255),
                username VARCHAR(255),
                password VARCHAR(255) NOT NULL,
                role VARCHAR(255),
                status VARCHAR(255) DEFAULT 'noactive',
                image VARCHAR(255) DEFAULT 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        console.log('Table "users" created or already exists.');

        // Tạo bảng "password_reset_tokens" nếu chưa tồn tại
        await db.execute(`
        CREATE TABLE IF NOT EXISTS password_reset_tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            token VARCHAR(255) NOT NULL,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        `);

        console.log('Table "password_reset_tokens" created or already exists.');

        // Tạo bảng "notifications" nếu chưa tồn tại
        await db.execute(`
         CREATE TABLE IF NOT EXISTS notifications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
       `);

        console.log('Table "notifications" created or already exists.');


        // Tạo bảng "contracts" nếu chưa tồn tại
        await db.execute(`
        CREATE TABLE IF NOT EXISTS contracts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            vendor_id INT,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            start_date DATE,
            end_date DATE,
            value DECIMAL(10, 2),
            status VARCHAR(255) DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        `);

        console.log('Table "contracts" created or already exists.');

             // Tạo bảng "contracts" nếu chưa tồn tại
            //  await db.execute(`
            //  ALTER TABLE contracts
            //  ADD COLUMN file_url VARCHAR(255);
            //  `);

            //   await db.execute(`
            //   ALTER TABLE contracts
            //   ADD COLUMN teacher_id INT,
            //   ADD FOREIGN KEY (teacher_id) REFERENCES users(id);
              
            //  `);

            //    await db.execute(`
            //    CREATE TABLE IF NOT EXISTS contract_students (
            //     id INT AUTO_INCREMENT PRIMARY KEY,
            //     contract_id INT NOT NULL,
            //     student_id INT NOT NULL,
            //     FOREIGN KEY (contract_id) REFERENCES contracts(id),
            //     FOREIGN KEY (student_id) REFERENCES users(id)
            // );
            //  `);

    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
    }
};

createTables();
