import { prisma } from "../lib/prisma.js";


export function findAllCard() {
  return prisma.card.findMany()
}

export function findCardById(id) {
  return prisma.card.findUnique({
    where: { id }
  })
}

export function createCard(data) {
  return prisma.card.create({ data })
}

export function updateCard(id, data) {
  return prisma.card.update({
    where: { id },
    data: {
      name: data.name,
      rarity: data.rarity,
      color: data.color,
      price: data.price,
      stock: data.stock
    }
  })
}

export function removeCard(id) {
  return prisma.card.delete({
    where: { id }
  })
}