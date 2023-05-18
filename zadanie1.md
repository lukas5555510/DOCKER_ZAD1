# zadanie1.md

Plik index.js:

![image](https://github.com/lukas5555510/DOCKER_ZAD1/assets/83607788/aba34d32-54fd-4bd7-8469-a1b391d4fa9d)

Plik Dockerfile:

![image](https://github.com/lukas5555510/DOCKER_ZAD1/assets/83607788/f4bb1aa4-b9c1-43b7-989d-c57893493e27)

Zbudowanie obrazu:
docker build -t "docker_zad1" .

Sprawdzenie ile warstw ma obraz:
docker inspect docker_zad1 | jq '.[]["RootFS"]["Layers"]'
![image](https://github.com/lukas5555510/DOCKER_ZAD1/assets/83607788/fa6c3569-c922-45f4-878e-5e4f8e4174bc)


Uruchomienie kontenera:
docker run -p 3000:8000 docker_zad1
-dzięki temu uzyskujemy efekt terminala podpiętego do serwera na którym wyświetlają się adresy użytkowników którzy się łączą z naszym serwerem
![image](https://github.com/lukas5555510/DOCKER_ZAD1/assets/83607788/1c0ec094-6d2f-44b4-a4b6-7c89c68e5681)

Widok strony:
![image](https://github.com/lukas5555510/DOCKER_ZAD1/assets/83607788/653e6369-0ee5-4ae8-bf91-3accfe0eea59)

