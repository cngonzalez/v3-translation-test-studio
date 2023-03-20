import {defineField} from 'sanity'

const BRANDS = ['tech', 'lifestyle']

export default defineField({
  name: 'brand',
  title: 'Brands',
  description: 'Used to colocate documents to only those in the same "Brand"',
  type: 'string',
  // hidden: true,
  validation: (Rule) => Rule.required(),
  options: {
    list: BRANDS
  },
})
