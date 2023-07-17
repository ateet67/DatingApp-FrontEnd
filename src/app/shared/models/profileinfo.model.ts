import { Ethnicity } from "../interfaces/ethnicity.type";
import { FoodAndDrinks } from "../interfaces/food-and-drinks.type";
import { GoingOut } from "../interfaces/going-out.type";
import { Hobby } from "../interfaces/hobby.type";
import { Profession } from "../interfaces/profession.type";
import { UserSocialProfile } from "../interfaces/user-social-profile.type";
import { User as userType } from "../interfaces/user.type";

export class ProfileInfo  {
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
    ethicity: any[] = [];
    food_prefrences: any[] = [];
    goingout_preference: any[] = [];
    professions: any[] = []
    hobby: any[] = []
    profile_like: any[] = [];
    likeList: any[] = [];
    swipeList: any[] = [];
    blockList: any[] = [];
    social_profiles!: Array<UserSocialProfile> 
    user_ethnicity!: Array<Ethnicity> 
    user_food_preference!: Array<FoodAndDrinks> 
    user_profession!: Array<Profession> 
    user_goingout_preference!: Array<GoingOut> 
    user_hobby!: Array<Hobby> 


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
        this.location = userinfo.location;
        this.address = userinfo.address;
        this.otp = userinfo.otp;
        this.zip_code = userinfo.zip_code;
        this.is_active = userinfo.is_active;
        this.is_deleted = userinfo.is_deleted;
        this.is_otp_verified = userinfo.is_otp_verified;
        this.dob = userinfo.dob;
        this.zodiac_id = userinfo.zodiac.id;
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
        this.likeList = userinfo.profile_like
        this.swipeList = userinfo.profile_swipe
        this.blockList = userinfo.user_blocklist
        this.hobby = userinfo.user_hobbies
        this.professions = userinfo.professions
        this.social_profiles = userinfo.social_profiles
        this.ethicity = userinfo.ethnicities_prefrences
        this.food_prefrences=userinfo.food_prefrences
        this.professions=userinfo.professions
        this.goingout_preference=userinfo.goingout_prefrences
        this.hobby=userinfo.user_hobbies
    }
}