import requests
import datetime
import pandas as pd
from utils.mongo_connect import MongoDBManager
from concurrent.futures import ThreadPoolExecutor

class ProcessFile():
    
    def __init__(self, upload_id, file_path):
        self.upload_id = upload_id
        self.file_path = file_path
        self.mongo_connect = MongoDBManager()
        self.update_status('P')   
        self.read_file()
    
    def update_status(self, status_code):
        update_data = {
            "upload_id": self.upload_id,
            "status": status_code
        }
        r = requests.patch('http://web:8000/upload/file-upload/', json=update_data)
        
    def read_large_csv(self, file_path, chunk_size=100000):
        reader = pd.read_csv(file_path, chunksize=chunk_size)
        return reader
        
    def process_chunk(self, chunk):
        chunk['upload_id'] = self.upload_id

        documents = chunk.to_dict(orient='records')
        self.save_on_mongo_bulk(documents)
                        
    def save_on_mongo_bulk(self, data):
        self.mongo_connect.bulk_insert_documents('clients', data)
        
    def read_file(self):
        file_path = self.file_path
        chunk_size = 50000  

        start_at = datetime.datetime.now()
        csv_reader = self.read_large_csv(file_path, chunk_size)
        print('Starting to read file: '+self.file_path)
        with ThreadPoolExecutor(max_workers=8) as executor:
            executor.map(self.process_chunk, csv_reader)

        ended_at = datetime.datetime.now()
        print("This file was processed in:")
        print(ended_at - start_at)
        self.update_status('F')