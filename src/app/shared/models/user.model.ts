import { User as userType } from "../interfaces/user.type";

export class User implements userType {
    first_name: string = '';
    middle_name: string = '';
    last_name: string = '';
    email: string = '';
    martialstatus: string = '';
    password: string = '';
    confirmPassword: string = '';
    gender: string = '';
    bio: string = '';
    education: string = '';
    height: number = 0;
    weight: number = 0;
    country_code: string = '';
    contact_number: string = '';
    preference: string = '';
    location: string = '';
    address: string = '';
    otp: string = '';
    zip_code: string = '';
    is_active: boolean = false;
    is_deleted: boolean = false;
    is_otp_verified: boolean = false;
    dob: string = '';
    zodiac_id: number = 0;
    lastforgetpasswordsend: Date = new Date();
    lastresetpassword: Date = new Date();
    img: string = "";
    image: File | null = null;
    passwordsalt: string = "";
    role_id: number = 2;
    country_id: number = 0;
    state_id: number = 0;
    city_id: number = 0;
    jwttoken: string = "";
    tokencreateddate: Date = new Date();
    token: string = "";
    ethicity: number[] = [];
    food_preference: number[] = [];
    goingout_preference: number[] = [];

    constructor(json: any) { }
}   