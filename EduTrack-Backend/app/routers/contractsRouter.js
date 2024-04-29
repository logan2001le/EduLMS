const express = require('express');
const contractController = require('../controllers/contractController');
const verifyToken = require('../utils/middleware');

const router = express.Router();

router.post('/reviews/:contractId', contractController.addReview);
router.get('/reviews/:contractId', contractController.getReviews);


// Route để tìm kiếm hợp đồng dựa trên các điều kiện
router.get('/search',  contractController.searchContracts);

// Route để tạo hợp đồng mới
router.post('/',  contractController.createContract);

// Route để cập nhật thông tin hợp đồng theo ID
router.put('/:id',  contractController.updateContract);

// Route để xóa hợp đồng theo ID
router.delete('/:id',  contractController.deleteContract);

// Route để lấy tất cả hợp đồng
router.get('/',  contractController.getAllContracts);

// Route để lấy thông tin hợp đồng theo ID
router.get('/:id',  contractController.getContractById);

router.post('/students/:id',  contractController.addStudentToContract);

router.post('/teachers/:id',  contractController.addTeacherToContract);

router.get('/students/:id',  contractController.getAllStudentsInContract);

module.exports = router;
