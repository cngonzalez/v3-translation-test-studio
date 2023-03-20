import React, { useMemo } from 'react'
import { SanityDocument, useSchema } from 'sanity'
import { BaseDocumentDeserializer, BaseDocumentSerializer, BaseDocumentMerger } from 'sanity-naive-html-serializer'

interface Props {
  document: {
    displayed: SanityDocument
  }
}
export const DeserializeView = ({ document: {displayed} }: Props) => {
  const schemas = useSchema()
  const serializer = BaseDocumentSerializer(schemas)
  const type = schemas.get(displayed._type)
  const serialized = useMemo(() => {
      if (displayed) {
        return serializer.serializeDocument(displayed, 'document')
      }
    }, [displayed])
  const deserializer = BaseDocumentDeserializer
  const merger = BaseDocumentMerger
  const deserialized = useMemo(() => {
    if (serialized && serialized.content) {
      return deserializer.deserializeDocument(serialized.content)
    }
  }, [serialized])

  const merged = useMemo(() => {
    if (deserialized && displayed) {
      return merger.documentLevelMerge(deserialized, displayed)
    }
  }, [deserialized, displayed])
  debugger


  return <div>
    {serialized?.content}
    <br />
    <br />
    {JSON.stringify(deserialized)}
    <br />
    <br />
    {JSON.stringify(merged)}
  </div>
}