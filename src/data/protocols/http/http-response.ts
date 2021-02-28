export enum HttpStatuscode {
    unathorized = 401,
    noContent = 204,
    ok = 200
}

export type HttpResponse = {
    statusCode: HttpStatuscode,
    body?: any
}