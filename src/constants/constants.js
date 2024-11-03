//url for locally running backend
//todo: switch this to use the correct url when backend is deployed
export const dbUrl = "http://localhost:8080"

//This is test URL from softala -service's tmp -directory.
//Note this is an old java -jar and is not actively runned (has to be manually runned).
//export const dbUrl = "http://softala.haaga-helia.fi:8080/"

//Note the API url is
//export const dbUrl = "http://softala.haaga-helia.fi:8080/api/weathers" 

//Important URL! It will link to actual deployed backend java jar in softala -service.

//NOTE 29.10.2024! The URL is not working since java -jar didn't work.
//Also I don't permission to update java -jar and the specific service
//called redweather.

//export const dbUrl = "http://softala.haaga-helia.fi:8082/api/weathers"