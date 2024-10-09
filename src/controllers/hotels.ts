import { Response, Request } from "express";
import dotenv from "dotenv";
import { prismaClient } from "..";

dotenv.config();

export const createHotel = async (req: Request, res: Response) => {
  const { name, country, city, address, brandName } = req.body;

  try {
    const hotel = await prismaClient.hotel.create({
      data: {
        name,
        country,
        city,
        address,
        brandName,
      },
    });

    res
      .status(201)
      .json({ hotel, message: "Hotel created successfully!", error: false });
  } catch (err) {
    console.error("Error during hotel creation:", err);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const getAllHotels = async (req: Request, res: Response) => {
  const { brandName } = req.query;

  try {
    const hotels = await prismaClient.hotel.findMany({
      where: brandName ? { brandName: String(brandName) } : {},
      include: { brand: true },
    });

    res.status(200).json({ hotels, error: false });
  } catch (err) {
    console.error("Error fetching hotels:", err);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const getSingleHotel = async (req: Request, res: Response) => {
  const { hotelId } = req.params;

  try {
    const hotel = await prismaClient.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotel) {
      return res.status(404).json({
        error: true,
        message: "hotel not found or you don't have permission to access it.",
      });
    }

    res.json({
      hotel,
      message: "hotel retrieved successfully!",
      error: false,
    });
  } catch (error) {
    console.error("Error retrieving hotel:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  const { hotelId } = req.params;

  try {
    const hotel = await prismaClient.hotel.delete({
      where: { id: hotelId },
    });

    if (!hotel) {
      return res.status(404).json({ error: true, message: "hotel not found" });
    }

    return res.json({
      message: "hotel deleted successfully!",
      error: false,
    });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  const { hotelId } = req.params;

  try {
    const hotel = await prismaClient.hotel.update({
      where: { id: hotelId },
      data: { ...req.body },
    });

    return res.json({
      hotel,
      message: "hotel updated successfully!",
      error: false,
    });
  } catch (error) {
    console.error("Error updating hotel:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};
