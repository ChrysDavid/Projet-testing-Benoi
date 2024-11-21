/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zp3jcf5aqyd4e3d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ce0dtcut",
    "name": "status",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zp3jcf5aqyd4e3d")

  // remove
  collection.schema.removeField("ce0dtcut")

  return dao.saveCollection(collection)
})
