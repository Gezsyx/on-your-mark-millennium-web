import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import bcyrpt from "bcrypt";

export const getUser = async (req: Request, res: Response) => {
  try {
    const allUser = await prisma.user.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res
      .status(200)
      .json({ message: "Data berhasil ditampilkan", users: allUser });
  } catch (error) {
    res.status(500).json({
      message: "Error Cik",
      error,
    });
  }
};

export const saveUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, image } = req.body;

    if (!name || !email || !password || !image) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    const hashedPassword = await bcyrpt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image,
      },
    });

    res.status(201).json({
      message: "User berhasil dibuat",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat User",
      error,
    });
  }
};

export const showUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        message: "user tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Detail user berhasil diambil",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail user",
      error,
    });
  }
};

export const updateUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    const { name, email, password, image } = req.body;

    const hashedPassword = await bcyrpt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: name ?? existingUser.name,
        email: email ?? existingUser.email,
        password: hashedPassword ?? existingUser.password,
        image: image ?? existingUser.image,
      },
    });

    res.status(200).json({
      message: "User berhasil diupdate",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update User",
      error,
    });
  }
};

export const deleteUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({
      message: `User dengan id ${id} berhasil dihapus`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus User",
      error,
    });
  }
};
