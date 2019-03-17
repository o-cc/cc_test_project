const baseUrl = "http://127.0.0.1:5000/api/";
var globalUrl = {
    httpServerUrl: {
        signIn   : baseUrl + "authorizations/",
        register : baseUrl + "users/",
        password : baseUrl + "passwords/",
        memo     : baseUrl + "memos/",
        note     : baseUrl + "notes/",
        plan     : baseUrl + "schedules/",
    }
}