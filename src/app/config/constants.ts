import { Injectable } from '@angular/core';
@Injectable()
export class Constants {
    public static API_ENDPOINT: string = 'http://localhost:8080/api';
    public static SOCKET_ENDPOINT: string = 'http://localhost:8080';
    public static API_MOCK_ENDPOINT: string = 'https://www.userdomainmock.com/';
} 