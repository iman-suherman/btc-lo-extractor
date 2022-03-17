export interface RouteExpress {
    method: string;
    route: string;
    controller: any;
    action: string;
}

// Interfaces Error Handling
export interface ExpressError {
    value?: string;
    msg?: string;
    param?: string;
    location?: string;
}

export interface Error {
    status?: number;
    message?: string;
    errors?: ExpressError[];
}

export type IWhoIsAccess =
    | 'adminAccessToken'
    | 'adminRefreshToken'
    | 'deviceRefreshToken'
    | 'deviceAccessToken'
    | 'userRefreshToken'
    | 'userAccessToken'
    | 'userAgentRefreshToken'
    | 'userAgentAccessToken';
