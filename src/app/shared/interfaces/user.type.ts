export interface User {
    id?:number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    martialstatus: string;
    password: string;
    confirmPassword: string;
    gender: string;
    bio?: string;
    education: string;
    height: number;
    weight: number;
    country_code: string;
    contact_number: string;
    preference: string;
    location?: string;
    address: string;
    otp?: string;
    zip_code?: string;
    is_active: boolean;
    is_deleted: boolean;
    is_otp_verified: boolean;
    dob: string;
    zodiac_id: number;
    lastforgetpasswordsend?: Date;
    lastresetpassword?: Date;
    img: string;
    passwordsalt: string;
    role_id: number;
    country_id: number;
    state_id: number;
    city_id: number;
    jwttoken?: string;
    tokencreateddate?: Date;
    token?: string;
    ethicity: number[];
    food_preference: number[];
    goingout_preference: number[];
    image: File | null;
}
