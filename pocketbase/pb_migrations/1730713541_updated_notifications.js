/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("70qlfilp7dgoetz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1ooln6wq",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("70qlfilp7dgoetz")

  // remove
  collection.schema.removeField("1ooln6wq")

  return dao.saveCollection(collection)
})
