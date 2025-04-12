FROM duluca/minimal-node-web-server
WORKDIR /usr/src/app
COPY  ./dist/cadastro-de-clientes/* public

ENTRYPOINT ["npm", "start"]
