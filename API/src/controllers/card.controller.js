import bcrypt from 'bcrypt'
import createError from 'http-errors'
import { createCard, findAllCard, findCardById, removeCard, updateCard } from '../services/card.service.js'

export async function getAllCard(req, res, next) {
  try {
    const cards = await findAllCard()
    res.json({ cards })
  } catch (error) {
    next(error)
  }
}

export async function getCardById(req, res, next) {
  try {
    const { id } = req.params
    const card = await findCardById(id)
    if (!card) throw createError(404, 'ไม่พบข้อมูลการ์ดใบนี้')
    res.json({ card })
  } catch (error) {
    next(error)
  }
}

export async function addCard(req, res, next) {
  try {
    const newCard = await createCard(req.body)
    res.json({
      message: 'เพิ่มการ์ดสำเร็จ',
      card: newCard
    })
  } catch (error) {
    next(error)
  }
}

export async function editCard(req, res, next) {
  try {
    const { id } = req.params
    const updatedCard = await updateCard(id, req.body)
    res.json({
      message: 'แก้ไขการ์ดสำเร็จ',
      card: updatedCard
    })
  } catch (error) {
    next(error)
  }
}

export async function deleteCard(req, res, next) {
  try {
    const { id } = req.params
    await removeCard(id)
    res.json({ message: 'ลบการ์ดออกจากระบบสำเร็จ', id })
  } catch (error) {
    next(error)
  }
}