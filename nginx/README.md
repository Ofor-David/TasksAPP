# SSL & NGINX SETUP
A simple walkthrough on setting up SSL and Nginx for this project.

## SSL
Run the following command to generate a selfsigned ssl cert for testing:
### 1. Install OpenSSL if not already installed
```bash
sudo apt install openssl
```
### 2. Generate the self-signed certificate and private key
```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048
  -keyout /etc/ssl/private/nginx-selfsigned.key
  -out /etc/ssl/certs/nginx-selfsigned.crt
```
### 3. Generate strong Diffie-Hellman parameters
```bash
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```
## NGINX
Then Run the following command to edit the Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/default
```

Then, replace the content of the file with the configuration from your `nginx.conf` file. Ensure that the configuration is correct and matches your setup. Here's an example of what the configuration might look like:

```nginx
server {
    listen 443 ssl;
    server_name _;

    ssl_certificate     /etc/ssl/certs/nginx-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
    ssl_dhparam         /etc/ssl/certs/dhparam.pem;

    location / {
        proxy_pass http://localhost:5000;  # Adjust for your backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # CORS headers for regular requests
        add_header Access-Control-Allow-Origin "https://xxxxxxxxxxxxxx.cloudfront.net" always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
        add_header Access-Control-Allow-Credentials "true" always;

        # Handle preflight OPTIONS requests
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin "https://xxxxxxxxxxxxxx.cloudfront.net"; //replace with actual cloudfront url
            add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
            add_header Access-Control-Allow-Headers "Content-Type, Authorization";
            add_header Access-Control-Allow-Credentials "true";
            add_header Content-Length 0;
            return 204;
        }
    }
}
```

After saving the file, test the configuration to ensure there are no syntax errors:

```bash
sudo nginx -t
```

If the test is successful, reload Nginx to apply the changes:

```bash
sudo systemctl reload nginx
```
