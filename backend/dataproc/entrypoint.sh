
echo "Waiting for rabbit..."

while ! nc -z 'rabbitmq' '5672'; do
    sleep 0.1
done

echo "Rabbit started"

exec "$@"