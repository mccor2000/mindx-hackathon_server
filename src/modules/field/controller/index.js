import service from '../service'
import { wrap } from '../../../utils'

const getManyFields = async (_req, res) => {
  const fields = await service.getManyFields()

  res.status(200).json({ data: fields })
}

const createField = async (req, res) => {
  const newField = await service.createField(req.body)

  res.status(201).json({ data: newField })
}

const getFieldById = async (req, res) => {
  const field = await service.getFieldById(req.params.fieldId)

  res.status(200).json({ data: field })
}

const updateFieldById = async (req, res) => {
  const updatedField = await service.updateFieldById(
    req.params.fieldId,
    req.body
  )

  res.status(200).json({ updatedField })
}

const deleteFieldById = async (req, res) => {
  await service.deleteFieldById(req.params.fieldId)

  res.status(204).end()
}

export default {
  getManyFields: wrap(getManyFields),
  createField: wrap(createField),
  getFieldById: wrap(getFieldById),
  updateFieldById: wrap(updateFieldById),
  deleteFieldById: wrap(deleteFieldById),
}
