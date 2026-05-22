import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

export const getPembicara = async (
  req: Request,
  res: Response
) => {
  try {
    const allPembicara = await prisma.pembicara.findMany({
      include: {
        events: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json({
      message: "Data pembicara berhasil ditampilkan",
      data: allPembicara,
    });
  } catch (error) {
  res.status(500).json({
    message: "Gagal mengambil data pembicara",
    error: error instanceof Error ? error.message : error,
  });
}
};

export const savePembicara = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, role, image } = req.body;

    /**
     * VALIDATION
     */
    if (!name || !role || !image) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    /**
     * CREATE PEMBICARA
     */
    const newPembicara = await prisma.pembicara.create({
      data: {
        name,
        role,
        image,
      },
    });

    res.status(201).json({
      message: "Pembicara berhasil dibuat",
      data: newPembicara,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat pembicara",
      error,
    });
  }
};

export const showPembicaraById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    const pembicara = await prisma.pembicara.findUnique({
      where: { id },
      include: {
        events: true,
      },
    });

    if (!pembicara) {
      return res.status(404).json({
        message: "Pembicara tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Detail pembicara berhasil diambil",
      data: pembicara,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail pembicara",
      error,
    });
  }
};

export const updatePembicaraById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    const existingPembicara =
      await prisma.pembicara.findUnique({
        where: { id },
      });

    if (!existingPembicara) {
      return res.status(404).json({
        message: "Pembicara tidak ditemukan",
      });
    }

    const { name, role, image } = req.body;

    const updatedPembicara =
      await prisma.pembicara.update({
        where: { id },
        data: {
          name: name ?? existingPembicara.name,
          role: role ?? existingPembicara.role,
          image: image ?? existingPembicara.image,
        },
      });

    res.status(200).json({
      message: "Pembicara berhasil diupdate",
      data: updatedPembicara,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update pembicara",
      error,
    });
  }
};

export const deletePembicaraById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    const existingPembicara =
      await prisma.pembicara.findUnique({
        where: { id },
      });

    if (!existingPembicara) {
      return res.status(404).json({
        message: "Pembicara tidak ditemukan",
      });
    }

    await prisma.pembicara.delete({
      where: { id },
    });

    res.status(200).json({
      message: `Pembicara dengan id ${id} berhasil dihapus`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus pembicara",
      error,
    });
  }
};