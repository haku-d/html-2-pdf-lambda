## Build your application

```
sam build
```

## Deploy your application to the AWS Cloud

```
sam deploy --guided
```

## Test your deployment
```
curl --location 'YOUR_API_GATEWAY_ENDPOINT' \
--header 'Accept: application/pdf' \
--header 'Content-Type: application/json' \
--data '{
    "content": "<h1>Hello world</h1>"
}'
```
