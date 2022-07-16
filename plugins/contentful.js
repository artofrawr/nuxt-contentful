const { documentToHtmlString } = require('@contentful/rich-text-html-renderer')
const _ = require('lodash')
const contentful = require('contentful')

// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const config = {
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
}

const createClient = () => {
  return contentful.createClient(config)
}

const fetchPage = async (slug) => {
  const client = createClient()
  const response = await client.getEntries({
    content_type: 'page',
    'fields.slug[in]': slug,
  })
  return _.get(response, 'items[0]')
}

/**
 * Flattens a Contentful data response, extracting the fields from child
 * objects and setting them to the parent name.
 * Example: { "sys": { id: "1234"}, "fields": { cta: "test"} } => { id: "1234", cta: "test"}
 **/
const fieldsParser = (
  data,
  props = { include: 10 },
  options = { parseArrays: true, parseRefs: true }
) => {
  /**
   * Check to see if the object passed is an object that contains only a `sys`
   * property and no feields. If so, either the model is empty, draft, or unpublished.
   */
  function emptyModel(object) {
    return !!(
      object &&
      typeof object === 'object' &&
      Object.prototype.hasOwnProperty.call(object, 'sys') &&
      Object.keys(object).length === 1
    )
  }

  /**
   * Handle parsing non-field value objects, cleaning empty value objects that
   * contain no fields or filtering object arrays that contain empty objects with
   * just sys defined. Or, simply returning the value, unmanipulated.
   */
  function parseValue(value, depth = 0) {
    // If value is an object and only contains a sys property, just return null
    // since it’s either an empty or unpublished entry
    if (emptyModel(value)) {
      return null
    }

    if (Array.isArray(value) && options.parseArrays) {
      return value
        .filter((item) => {
          return !emptyModel(item)
        })
        .map((item) => {
          return item && typeof item === 'object' && item.fields
            ? parseFields(item.fields, item.sys, {}, depth + 1)
            : parseValue(item, depth + 1)
        })
    }

    if (value.nodeType === 'document') {
      return documentToHtmlString(value)
    }

    return value
  }

  /**
   * Parse over a fields object, parsing child fields or building rest of object.
   *
   * @param  {Object} fieldsObject - fields object to iterate over and flatten into objectRef
   * @param  {Object} sys - sys object associated with fieldsObject
   * @param  {Object} objectRef - Compiled object that flattens the field objects
   * @return {Object}
   */
  function parseFields(fieldsObject, sys, objectRef = {}, depth = 0) {
    if (!fieldsObject || typeof fieldsObject !== 'object') {
      return objectRef
    }

    if (depth >= props.include) {
      return objectRef
    }

    const objectRefClone = Object.assign({}, objectRef)

    // Iterate over fieldObject keys, rercursively parsing child objects that
    // contain fields, or parsing non-fields-child objects/entries
    Object.keys(fieldsObject).forEach((key) => {
      objectRefClone[key] =
        fieldsObject[key] && fieldsObject[key].fields && options.parseRefs
          ? parseFields(
              fieldsObject[key].fields,
              fieldsObject[key].sys,
              objectRefClone[key],
              depth + 1
            )
          : parseValue(fieldsObject[key], depth + 1)
    })

    // Apply typeNameKey/value to each fields object to define the Contentful model type
    const contentTypeId =
      sys && sys.contentType && sys.contentType.sys && sys.contentType.sys.id

    if (contentTypeId) {
      /* eslint-disable */
      objectRefClone['id'] = sys.id
      objectRefClone['__typename'] = sys.contentType.sys.id
      /* eslint-enable */
    }

    // Apply updatedAt
    if (sys && sys.updatedAt) {
      objectRefClone.updatedAt = sys.updatedAt
    }

    // Apply createdAt
    if (sys && sys.createdAt) {
      objectRefClone.createdAt = sys.createdAt
    }

    return objectRefClone
  }

  const dataClone = Object.assign({}, data)

  return parseFields(dataClone.fields, dataClone.sys)
}

// export `createClient` to use it in page components
module.exports = {
  createClient,
  fetchPage,
  fieldsParser,
}
