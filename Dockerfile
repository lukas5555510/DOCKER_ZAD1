#Etap 1 w którym zostaną zainstalowane potrzebne komponenty
FROM mhart/alpine-node:6
WORKDIR /app
COPY package.json package-lock.json ./
#wykorzystanie cache
RUN --mount=type=cache,target=~/.npm \
    npm install

#Etap 2 w którym do lekkiego obrazu zostaną przeniesione potrzebne komponenty
FROM mhart/alpine-node:slim-6

LABEL author="Łukasz Kałuszyński"

EXPOSE 8000

WORKDIR /app
COPY --from=0 /app .
COPY . .
CMD ["node", "index.js"]
#Monitorowanie dostępności servera
HEALTHCHECK --interval=10s --timeout=1s \
 CMD curl -f http://localhost:8000/ || exit 1

