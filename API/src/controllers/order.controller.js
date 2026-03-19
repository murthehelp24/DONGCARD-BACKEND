import createError from 'http-errors'
import { createOrder, findAllOder, findOrderById } from "../services/order.service.js"


export async function addOrder(req, res, next) {
  try {
    console.log(req.body)
    const orders = await createOrder(req.body)
    res.json({
      message: "เพิ่มออเดอร์สำเร็จ",
      orders
    })
  } catch (error) {
    next(error)
  }
}

export async function getAllOrder(req, res, next) {
  try {
    const orders = await findAllOder()
    res.json({ orders })
  } catch (error) {
    next(error)
  }
}

export async function getOrderById(req, res, next) {
  try {
    const { id } = req.params
    const order = await findOrderById(id)
    if (!order) throw createError(404, 'ไม่พบออเดอร์นี้')
    res.json({ order })
  } catch (error) {
    next(error)
  }
}