https://github.com/opencart/opencart/releases/tag/4.1.0.0

Windows

1. rename upload/.htaccess.txt => .htaccess
<pre>docker-compose up -d</pre>

2. http://localhost/amdin => login => Seting=> Edit Your Store => Server => Use SEO URLs =ON

Linux

1. docker-compose.yml => --http_server http://localhost/ => rename --http_server http://<severname>
2. You need to grant permissions to user 1000 or use the root user, user: 1000:1000 => user:root
3. rename upload/.htaccess.txt => .htaccess
4. <pre>docker-compose up -d</pre>
5. Continue with step 2 as on Windows OS. And make sure that the .htaccess file is present in /var/www/html inside the container.
