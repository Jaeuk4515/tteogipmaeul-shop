import { Router } from "express";
import { productsService } from "../services/productsService.js";

const productsRouter = Router();

// 상품 추가(Admin) o
productsRouter.post("/", async (req, res) => {
  try {
    const productInfo = req.body;
    const createdProduct = await productsService.addProduct(productInfo);
    res.json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 상품 전체 목록 조회 o
productsRouter.get("/", async (req, res) => {
  try {
    const products = await productsService.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 카테고리 별 상품 목록 조회 o
productsRouter.get("/category", async (req, res) => {
  try {
    const categoryName = req.query.categoryName;
    const products = await productsService.getProductsByCategoryName(
      categoryName
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 상품 상세 항목 조회 o
productsRouter.get("/:productNo", async (req, res) => {
  try {
    const productNo = req.params.productNo;
    const product = await productsService.getProductByProductNo(productNo);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 상품 수정(Admin) o
productsRouter.put("/:productNo", async (req, res) => {
  try {
    const productNo = req.params.productNo;
    const update = req.body;
    const updatedProduct = await productsService.setProductByProductNo(
      productNo,
      update
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 상품 삭제(Admin) o
productsRouter.delete("/:productNo", async (req, res) => {
  try {
    const productNo = req.params.productNo;
    await productsService.deleteProductByProductNo(productNo);
    res.json({ result: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { productsRouter };
