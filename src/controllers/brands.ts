import { Response, Request } from "express";
import dotenv from "dotenv";
import { prismaClient } from "..";

dotenv.config();

export const createBrand = async (req: Request, res: Response) => {
  const { name, hq, ceo } = req.body;

  try {
    const brand = await prismaClient.brand.create({
      data: {
        name,
        hq,
        ceo,
      },
    });

    res
      .status(201)
      .json({ brand, message: "brand created successfully!", error: false });
  } catch (err) {
    console.error("Error during brand creation:", err);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await prismaClient.brand.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        name: true,
        hq: true,
        ceo: true,
      },
    });

    res.json({
      brands,
      message: "Brands retrieved successfully!",
      error: false,
    });
  } catch (error) {
    console.error("Error retrieving brands:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const getSingleBrand = async (req: Request, res: Response) => {
  const { brandId } = req.params;

  try {
    const brand = await prismaClient.brand.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      return res.status(404).json({
        error: true,
        message: "brand not found or you don't have permission to access it.",
      });
    }

    res.json({
      brand,
      message: "brand retrieved successfully!",
      error: false,
    });
  } catch (error) {
    console.error("Error retrieving brand:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  const { brandId } = req.params;

  try {
    const brand = await prismaClient.brand.delete({
      where: { id: brandId },
    });

    if (!brand) {
      return res.status(404).json({ error: true, message: "brand not found" });
    }

    return res.json({
      message: "brand deleted successfully!",
      error: false,
    });
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  const { brandId } = req.params;

  try {
    const brand = await prismaClient.brand.update({
      where: { id: brandId },
      data: { ...req.body },
    });

    return res.json({
      brand,
      message: "brand updated successfully!",
      error: false,
    });
  } catch (error) {
    console.error("Error updating brand:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};
