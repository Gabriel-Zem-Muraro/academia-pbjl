const express = require('express');
const router = express.Router();
const controller = require('../controllers/alunoController');
const { validarAluno } = require('../middlewares/validations');

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.post('/', validarAluno, controller.criar);
router.put('/:id', validarAluno, controller.atualizar);
router.delete('/:id', controller.remover);

module.exports = router;
