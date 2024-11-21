/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zp3jcf5aqyd4e3d")

  // remove
  collection.schema.removeField("s0xhiz1c")

  // remove
  collection.schema.removeField("ixuifpmx")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zp3jcf5aqyd4e3d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s0xhiz1c",
    "name": "creation_date",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ixuifpmx",
    "name": "update_date",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
