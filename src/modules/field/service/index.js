import { AppError, ErrorType } from '../../../utils/errors'
import Field from '../model'
import { Roadmap } from '../../roadmap/model'

const getManyFields = async (filter = {}) => {
  const fields = await Field.find(filter).lean().exec()

  return fields
}

const createField = async (fieldData) => {
  const existingField = await Roadmap.findOne({ title: fieldData.title })
    .lean()
    .exec()

  if (existingField)
    throw new AppError(ErrorType.BAD_REQUEST, 'Field is already exist')

  return Field.create(fieldData)
}

const getFieldById = async (fieldId) => {
  const field = await Field.findById(fieldId).lean().exec()

  if (!field) throw new AppError(ErrorType.BAD_REQUEST, 'Field not found')

  return field
}

const updateFieldById = async (fieldId, updateData) => {
  const updatedField = await Field.findByIdAndUpdate(fieldId, updateData)
    .select('_id')
    .lean()
    .exec()

  if (!updatedField)
    throw new AppError(ErrorType.BAD_REQUEST, 'Field not found')

  return updatedField
}

const deleteFieldById = async (fieldId) => {
  const deletedField = await Field.findByIdAndDelete(fieldId)
    .select('_id')
    .lean()
    .exec()

  if (!deletedField)
    throw new AppError(ErrorType.BAD_REQUEST, 'Field not found')

  return deletedField
}

export default {
  getManyFields,
  createField,
  getFieldById,
  updateFieldById,
  deleteFieldById,
}
