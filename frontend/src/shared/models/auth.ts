/** Model for the Login */
interface Login {
    username: string;
    password: string;
}

/** Model for the Signup process */
interface Signup {
    firstName: string;
    lastName: string;
    age: number;
    emailId: string;
    mrnNumber: string;
    phoneNumber: string;
    password: string;
}

/** Model for the forgot password */
interface ForgotPassword {
    username: string;
}
