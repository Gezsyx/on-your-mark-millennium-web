import { Request, Response } from "express";
import { Category } from "../types/category.js";
import { prisma } from "../lib/db.js";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const allCategory = await prisma.category.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res
      .status(200)
      .json({ message: "Data berhasil ditampilkan", categories: allCategory });
  } catch (error) {
    res.status(500).json({
      message: "Error Boss",
      error,
    });
  }
};

export const saveCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Nama category wajib diisi" });
    }
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    res
      .status(201)
      .json({ message: "Data berhasil disimpan", data: newCategory });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menyimpan category",
      error,
    });
  }
};

export const showCategoryById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      return res.status(404).json({
        message: "Category tidak ditemukan",
      });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail Category",
      error,
    });
  }
};

export const updateCategoryById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      return res.status(404).json({
        message: "Category tidak ditemukan",
      });
    }
    const { name } = req.body;
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: name ?? existingCategory.name,
      },
    });
    res.json({
      message: "Category berhasil diupdate",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update Category",
      error,
    });
  }
};

export const deleteCategoryById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      return res.status(404).json({
        message: "Category tidak ditemukan",
      });
    }
    await prisma.category.delete({
      where: { id },
    });
    res.json({
      message: `Category ${id} berhasil dihapus`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus category",
      error,
    });
  }
};
