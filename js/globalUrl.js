const baseUrl = "http://134.175.32.175:5555/api/";
var globalUrl = {
    httpServerUrl: {
        signIn   : baseUrl + "authorizations/",
        register : baseUrl + "users/",
        password : baseUrl + "passwords/",
        memo     : baseUrl + "memos/",
        note     : baseUrl + "notes/",
        plan     : baseUrl + "schedules/",
        accounts : baseUrl + "accounts/",
        income   : baseUrl + "income/",
        expenses : baseUrl + "expenses/",
    }
}