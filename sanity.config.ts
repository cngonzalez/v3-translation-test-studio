import {defineConfig} from 'sanity'
import {DefaultDocumentNodeResolver, deskTool, StructureResolver} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { DeserializeView } from './DeserializeView'
import { table } from '@sanity/table';
import { withDocumentI18nPlugin } from '@sanity/document-internationalization'
import { TranslationsTab, defaultDocumentLevelConfig} from 'sanity-plugin-transifex'
import { TranslationsTab as SmartlingTab, defaultDocumentLevelConfig as smartlingConfig} from 'sanity-plugin-studio-smartling'


const i18n = {
  languages: [
    {id: 'en', title: 'English', isDefault: true},
    {id: 'fr-FR', title: 'French'},
    {id: 'de-DE', title: 'German'},
    {id: 'nb-NO', title: 'Norwegian'},
  ],
  defaultLanguage: 'en-EN',
}

const defaultDocumentNode: DefaultDocumentNodeResolver = (S) => {
  return S.document().views([
    S.view.form(),
    // S.view.component(TranslationsTab).title('Transifex').options(defaultDocumentLevelConfig),
    S.view.component(SmartlingTab).title('Smartling').options(smartlingConfig)
  ])
}

const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Custom document-level translation structure
      S.listItem()
        .title('Articles')
        .child(
          S.list()
            .title('Articles')
            .items(
              i18n.languages.map((language) =>
                S.listItem()
                  .title(
                    `Articles (${language.id.toLocaleUpperCase()}) ${
                      language.isDefault ? `(Base)` : ``
                    }`
                  )
                  .child(
                    S.documentList()
                      .id(language.id)
                      .title(`${language.title} Articles`)
                      .schemaType('article')
                      .filter(language.isDefault ? '_type == "article" && !defined(__i18n_lang)' : '_type == "article" && __i18n_lang == $language')
                      .params({language: language.id})
                    // .initialValueTemplates([
                    //   S.initialValueTemplateItem('lesson-language', {
                    //     language: language.id,
                    //   }),
                    // ])
                    //   .canHandleIntent(S.documentTypeList(`lesson`).getCanHandleIntent())
                  )
              )
            )
        ),
        S.divider(),
        ...S.documentTypeListItems().filter((listItem) => !['article'].includes(listItem.getId() as string)),
])

export default defineConfig({
  name: 'default',
  title: 'V3 Translation Test Studio',

  projectId: '8rfj8947',
  dataset: 'production',

  plugins: withDocumentI18nPlugin([deskTool(
    {defaultDocumentNode, structure},
  ), visionTool(), table()
], 
// {languages: ['en', 'fr', 'de', 'no']}`
  {languages: ['en-EN', 'fr-FR', 'de-DE', 'nb-NO']},
  ),
  // plugins: [
  //   deskTool(), visionTool(), table()
  // ],
  schema: {
    types: prev => schemaTypes(prev, 'tech'),
  },
})
