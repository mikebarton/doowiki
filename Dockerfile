FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
EXPOSE 80
EXPOSE 443
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

WORKDIR /
COPY /src/doowiki.domain/doowiki.domain.csproj ./doowiki.domain/
COPY /src/doowiki.application/doowiki.application.csproj ./doowiki.application/
COPY /src/doowiki.infrastructure/doowiki.infrastructure.csproj ./doowiki.infrastructure/
COPY /src/doowiki.web/doowiki.web.csproj doowiki.web/

RUN dotnet restore "./doowiki.domain/doowiki.domain.csproj"
RUN dotnet restore "./doowiki.application/doowiki.application.csproj"
RUN dotnet restore "./doowiki.infrastructure/doowiki.infrastructure.csproj"
RUN dotnet restore "./doowiki.web/doowiki.web.csproj"

COPY /src/doowiki.domain/ ./doowiki.domain/
COPY /src/doowiki.application/ ./doowiki.application/
COPY /src/doowiki.infrastructure/ ./doowiki.infrastructure/
COPY /src/doowiki.web/ ./doowiki.web/

WORKDIR /doowiki.web
RUN dotnet publish -c release -o /app --no-restore .
WORKDIR /app/ClientApp
RUN npm install --production

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "doowiki.web.dll"]