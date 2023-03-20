import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'from',
      title: 'From',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ]
})