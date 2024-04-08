const db = require('../config/db');

const contractController = {
    createContract: async (req, res) => {
        try {
            const { title, startDate, endDate, description, value, fileUrl } = req.body;

            const query = 'INSERT INTO contracts (title, start_date, end_date, description, value, file_url) VALUES (?, ?, ?, ?, ?, ?)';
            const [result] = await db.execute(query, [title, startDate, endDate, description, value, fileUrl]);
            const contractId = result.insertId;

            res.status(201).json({ id: contractId, title, startDate, endDate, description, value, fileUrl });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateContract: async (req, res) => {
        try {
            const contractId = req.params.id;
            const { title, startDate, endDate, description, value, fileUrl } = req.body;
            const query = 'UPDATE contracts SET title = ?, start_date = ?, end_date = ?, description = ?,file_url = ?, value = ? WHERE id = ?';
            await db.execute(query, [title, startDate, endDate, description, fileUrl, value, contractId]);
            res.status(200).json({ message: 'Contract updated successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteContract: async (req, res) => {
        try {
            const contractId = req.params.id;
            const query = 'DELETE FROM contracts WHERE id = ?';
            await db.execute(query, [contractId]);
            res.status(200).json({ message: 'Contract deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getAllContracts: async (req, res) => {
        try {
            const query = `
                SELECT contracts.*, users.email AS teacher_email, users.phone AS teacher_phone, users.username AS teacher_username
                FROM contracts
                LEFT JOIN users ON contracts.teacher_id = users.id
            `;
            const [contracts] = await db.execute(query);
            res.status(200).json({ data: contracts });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    

    getContractById: async (req, res) => {
        try {
            const contractId = req.params.id;
            const query = 'SELECT * FROM contracts WHERE id = ?';
            const [contract] = await db.execute(query, [contractId]);

            if (contract.length === 0) {
                return res.status(404).json({ message: 'Contract not found' });
            }

            res.status(200).json({ data: contract[0] });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    searchContracts: async (req, res) => {
        try {
            const { keyword } = req.query;

            let conditions = [];
            let params = [];

            if (keyword) {
                conditions.push('(contracts.title LIKE ? OR vendors.name LIKE ?)');
                params.push(`%${keyword}%`);
                params.push(`%${keyword}%`);
            }

            let conditionStr = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
            const query = `
                SELECT contracts.*, vendors.name AS vendor_name
                FROM contracts
                LEFT JOIN vendors ON contracts.vendor_id = vendors.id
                ${conditionStr}
            `;
            const [contracts] = await db.execute(query, params);

            res.status(200).json({ data: contracts });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    addTeacherToContract: async (req, res) => {
        try {
            const contractId = req.params.id;

            const { teacherId } = req.body;

            const query = 'UPDATE contracts SET teacher_id = ? WHERE id = ?';
            await db.execute(query, [teacherId, contractId]);

            res.status(201).json({ message: 'Teacher added to contract successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    addStudentToContract: async (req, res) => {
        try {
            const contractId = req.params.id;
            const { studentId } = req.body;
    
            // Kiểm tra xem sinh viên đã tồn tại trong lớp hay chưa
            const checkQuery = 'SELECT * FROM contract_students WHERE contract_id = ? AND student_id = ?';
            const [existingStudent] = await db.execute(checkQuery, [contractId, studentId]);
    
            // Nếu sinh viên đã tồn tại trong lớp, trả về lỗi
            if (existingStudent.length > 0) {
                return res.status(201).json({ message: 'Sinh viên đã tồn tại trong lớp' });
            }
    
            // Nếu sinh viên chưa tồn tại trong lớp, thêm vào bảng contract_students
            const insertQuery = 'INSERT INTO contract_students (contract_id, student_id) VALUES (?, ?)';
            await db.execute(insertQuery, [contractId, studentId]);
    
            res.status(201).json({ message: 'Student added to contract successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    getAllStudentsInContract: async (req, res) => {
        try {
            const contractId = req.params.id;
            const query = `
                SELECT users.id, users.email, users.phone, users.username
                FROM users
                INNER JOIN contract_students ON users.id = contract_students.student_id
                WHERE contract_students.contract_id = ?
            `;
            const [students] = await db.execute(query, [contractId]);
            res.status(200).json({ data: students });
        } catch (err) {
            res.status(500).json(err);
        }
    },

};

module.exports = contractController;
