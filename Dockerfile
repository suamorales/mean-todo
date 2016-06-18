# our base image
FROM node:4-onbuild

# specify the port number the container should expose
EXPOSE 8080

# run the application
CMD ["node", "server.js"]