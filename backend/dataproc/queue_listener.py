import pika
import sys
import os
import time
import json
from process_file import ProcessFile
def main():
    credentials = pika.PlainCredentials(username='user', password='123456')
    parameters = pika.ConnectionParameters('rabbitmq', 5672, '/', credentials)
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    def callback(ch, method, properties, body):
        message = body.decode()
        message_obj = json.loads(message)
        ProcessFile(message_obj['id'], message_obj['file'])
        time.sleep(30)

    channel.basic_consume(queue='file_to_process_queue', on_message_callback=callback, auto_ack=True)

    print("[*] Waiting for messages. To exit, press CTRL+C")

    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        print("Interrupted")

        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
    

if __name__ == '__main__':
    main()