check: 
	docker compose config
up: check
	docker compose up -d
down:
	docker compose down
ps:
	docker compose ps -a
run-server:
	docker compose stop server
	docker compose run --rm -v ./source:/app -p 3001:3001 server bash
	docker compose start server
run-client: 
	docker compose stop client
	docker compose run --rm -v ./source/client:/app -p 3000:3000 client bash
	docker compose start client