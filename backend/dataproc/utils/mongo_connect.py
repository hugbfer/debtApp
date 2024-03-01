import pymongo

class MongoDBManager:
    
    def __init__(self ):
        host = 'mongo'
        port = 27017
        database_name = 'clients'
        self.client = pymongo.MongoClient(host, port, username='admin', password='password')
        self.database = self.client[database_name]

    def insert_document(self, collection_name, document):
        collection = self.database[collection_name]
        result = collection.insert_one(document)
        return result.inserted_id
    
    def bulk_insert_documents(self, collection_name, documents):
        collection = self.database[collection_name]
        result = collection.insert_many(documents)
        return result.inserted_ids

    def close_connection(self):
        self.client.close()
