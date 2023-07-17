import { User as userType } from "../interfaces/user.type";

export class User implements userType {
    id?: number;
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
    location: string = '1234657';
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
    profile_like: any[] = [];

    constructor(userinfo: any) {
        this.id = userinfo?.id;
        this.email = userinfo.email;
        this.password = userinfo.password;
        this.first_name = userinfo.first_name;
        this.middle_name = userinfo.middle_name;
        this.last_name = userinfo.last_name;
        this.martialstatus = userinfo.martialstatus;
        this.password = userinfo.password;
        this.gender = userinfo.gender;
        this.bio = userinfo.bio;
        this.education = userinfo.education;
        this.height = userinfo.height;
        this.weight = userinfo.weight;
        this.country_code = userinfo.country_code;
        this.contact_number = userinfo.contact_number;
        this.preference = userinfo.preference;
        this.location = userinfo.location??"132465";
        this.address = userinfo.address;
        this.otp = userinfo.otp;
        this.zip_code = userinfo.zip_code;
        this.is_active = userinfo.is_active;
        this.is_deleted = userinfo.is_deleted;
        this.is_otp_verified = userinfo.is_otp_verified;
        this.dob = userinfo.dob;
        this.zodiac_id = userinfo.zodiac_id;
        this.lastforgetpasswordsend = userinfo.lastforgetpasswordsend;
        this.lastresetpassword = userinfo.lastresetpassword;
        this.img = userinfo.img;
        this.passwordsalt = userinfo.passwordsalt;
        this.role_id = userinfo.role_id;
        this.country_id = userinfo.country_id;
        this.state_id = userinfo.state_id;
        this.city_id = userinfo.city_id;
        this.jwttoken = userinfo.jwttoken;
        this.tokencreateddate = userinfo.tokencreateddate;
        this.token = userinfo.token;
     }
}   