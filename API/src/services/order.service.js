import { prisma } from "../lib/prisma.js";



export function createOrder(data) {
  return prisma.order.create({ data })
}


export function findAllOder() {
  return prisma.order.findMany()
}

export function findOrderById(id) {
  // console.log(id)
  return prisma.order.findUnique({
    where: { id: +id }
  })
}












