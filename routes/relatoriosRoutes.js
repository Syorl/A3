const express = require('express');
const router = express.Router();
const {
  getBestSellingProducts,
  getProductByCustomer,
  getAvgConsumption,
  getLowStockProducts
} = require('../controllers/relatorioController');

router.get('/relatorio', async (req, res) => {
  try {
    const bestSellingProducts = await getBestSellingProducts();
    const productByCustomer = await getProductByCustomer();
    const avgConsumption = await getAvgConsumption();
    const lowStockProducts = await getLowStockProducts();

    res.json({
      bestSellingProducts,
      productByCustomer,
      avgConsumption,
      lowStockProducts
    });
  } catch (error) {
    console.error('Erro ao buscar dados do relatório:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do relatório' });
  }
});

module.exports = router;
