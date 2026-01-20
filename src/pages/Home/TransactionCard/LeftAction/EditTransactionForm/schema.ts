import * as y from 'yup'

export const editTransactionSchema = y.object().shape({
  description: y.string().required('Description is required'),
  value: y
    .number()
    .min(0.01, 'Minimum value is 0,01')
    .required('Value is required'),
  categoryId: y
    .number()
    .min(1, 'Select a category')
    .required('Category is required'),
  typeId: y
    .number()
    .min(1, 'Select a type transaction')
    .required('Type is required'),
})
