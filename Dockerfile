# FROM node:18-buster-slim as react-build
# RUN node --version
# RUN npm --version

# WORKDIR /
# COPY /src/doowiki.web/doowiki.web.csproj ./doowiki.web/
# WORKDIR /doowiki.web/ClientApp
# RUN npm install
# RUN npm run build


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
EXPOSE 80
EXPOSE 443
RUN apt-get update
ENV NODE_VERSION=19.8.1
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

WORKDIR /
COPY /src/doowiki.domain/doowiki.domain.csproj ./doowiki.domain/
COPY /src/doowiki.application/doowiki.application.csproj ./doowiki.application/
COPY /src/doowiki.infrastructure/doowiki.infrastructure.csproj ./doowiki.infrastructure/
COPY /src/doowiki.web/doowiki.web.csproj ./doowiki.web/

RUN dotnet restore "./doowiki.domain/doowiki.domain.csproj"
RUN dotnet restore "./doowiki.application/doowiki.application.csproj"
RUN dotnet restore "./doowiki.infrastructure/doowiki.infrastructure.csproj"
RUN dotnet restore "./doowiki.web/doowiki.web.csproj"

COPY /src/doowiki.domain/ ./doowiki.domain/
COPY /src/doowiki.application/ ./doowiki.application/
COPY /src/doowiki.infrastructure/ ./doowiki.infrastructure/
COPY /src/doowiki.web/ ./doowiki.web/

WORKDIR /doowiki.web/ClientApp
RUN npm install
RUN npm run build
WORKDIR /doowiki.web
RUN dotnet publish -c release -o /app --no-restore .

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "doowiki.web.dll"]