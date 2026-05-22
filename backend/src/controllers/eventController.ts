import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      name,
      categoryId,
      pembicaraId,
      location,
      dateEvent,
      description,
    } = req.body;

    if (
      !name ||
      !categoryId ||
      !pembicaraId ||
      !location ||
      !dateEvent ||
      !description
    ) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

   
    const category = await prisma.category.findUnique({
      where: {
        id: Number(categoryId),
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category tidak ditemukan",
      });
    }


    const pembicara = await prisma.pembicara.findUnique({
      where: {
        id: Number(pembicaraId),
      },
    });

    if (!pembicara) {
      return res.status(404).json({
        message: "Pembicara tidak ditemukan",
      });
    }

    const newEvent = await prisma.event.create({
      data: {
        name,
        categoryId: Number(categoryId),
        pembicaraId: Number(pembicaraId),
        location,
        dateEvent: new Date(dateEvent),
        description,
      },
      include: {
        category: true,
        pembicara: true,
      },
    });

    res.status(201).json({
      message: "Event berhasil dibuat",
      data: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat event",
      error,
    });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        category: true,
        pembicara: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      message: "Berhasil mengambil data event",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data event",
      error,
    });
  }
};

export const getEventById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        category: true,
        pembicara: true,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    res.json({
      message: "Berhasil mengambil detail event",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail event",
      error,
    });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    const {
      name,
      categoryId,
      pembicaraId,
      location,
      dateEvent,
      description,
    } = req.body;

    /**
     * CHECK CATEGORY
     */
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: {
          id: Number(categoryId),
        },
      });

      if (!category) {
        return res.status(404).json({
          message: "Category tidak ditemukan",
        });
      }
    }

    /**
     * CHECK PEMBICARA
     */
    if (pembicaraId) {
      const pembicara = await prisma.pembicara.findUnique({
        where: {
          id: Number(pembicaraId),
        },
      });

      if (!pembicara) {
        return res.status(404).json({
          message: "Pembicara tidak ditemukan",
        });
      }
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        name: name ?? existingEvent.name,
        categoryId: categoryId
          ? Number(categoryId)
          : existingEvent.categoryId,
        pembicaraId: pembicaraId
          ? Number(pembicaraId)
          : existingEvent.pembicaraId,
        location: location ?? existingEvent.location,
        dateEvent: dateEvent
          ? new Date(dateEvent)
          : existingEvent.dateEvent,
        description:
          description ?? existingEvent.description,
      },
      include: {
        category: true,
        pembicara: true,
      },
    });

    res.json({
      message: "Event berhasil diupdate",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update event",
      error,
    });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    await prisma.event.delete({
      where: { id },
    });

    res.json({
      message: "Event berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus event",
      error,
    });
  }
};