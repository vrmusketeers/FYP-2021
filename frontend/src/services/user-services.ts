import axios from "axios";
import { APIURL } from "./api-constants";


class UserService {

    // /** Register a user */
    // async registerUser(data: UserRegistrationRequest) {
    //     let responseData = '';
    //     await axios.post(APIURL.REGISTER_USER, data).then(res => responseData = res.data);
    //     return responseData as string;
    // }

    /** Get list of Users */
    async registerExistingUser() {
        let responseData: PatientList[] = [];
        await axios.get(APIURL.ALL_USERS).then((res: { data: PatientList[] }) => responseData = res.data);
        console.log(responseData)
        return responseData as PatientList[];
    }


    async getUserById(userId: string) {
        let responseData: UserProfile = {} as UserProfile;
        await axios.get(`${APIURL.GET_PROFILE_BY_ID}/${userId}`).then((res: { data: UserProfile }) => responseData = res.data);
        console.log(responseData)
        return responseData as UserProfile;
    }



    async getPatientTestDetails(userId: string) {
        let responseData: UserProfile = {} as UserProfile;
        await axios.get(`${APIURL.GET_TEST_PROFILE_BY_ID}${userId}`).then((res: { data: UserProfile }) => responseData = res.data);
        console.log(responseData)
        return responseData as any;
    }

    // /** User Login */
    // async login(data: UserLogin) {
    //     let responseData: UserRegistrationResponse = {} as UserRegistrationResponse;
    //     await axios.post(APIURL.LOGIN_USER, data).then(res => responseData = res.data);
    //     authService.login(responseData.userId !== null, responseData.userType, responseData);
    //     return responseData as UserRegistrationResponse;
    // }

    // /** Check if the username exists */
    // async checkIfUserExists(data: UserExistsRequest) {
    //     let responseData = {};
    //     await axios.post(APIURL.CHECK_USER_EXISTS, data).then(res => responseData = res.data);
    //     return responseData as UserRegistrationResponse;
    // }

    // /** ADMIN - Create a new user account */
    // async createNewUserAccountAdmin(data: User) {
    //     let responseData = '';
    //     const req: any = { ...data };
    //     req.minBalance = 0;
    //     req.balance = 0;
    //     req.userType = 'User';
    //     await axios.post(APIURL.CREATE_USER_ACCOUNT, req).then(res => responseData = res.data);
    //     if (responseData === 'Success') {
    //         await axios.post(APIURL.UPDATE_REG_STATUS, {
    //             regid: req.regid,
    //             regstatus: 'Approved'
    //         }).then(res => responseData = res.data);
    //     } else {
    //         // Standard Error Page
    //     }
    //     return responseData as string;
    // }

    // /** ADMIN - Get Pending account request */
    // async getPendingAccountAdmin() {
    //     let responseData: UserRegistrationResponse[] = [];
    //     await axios.get(APIURL.GET_PENDING_ACCOUNT_REQUEST).then(res => responseData = res.data as UserRegistrationResponse[]);
    //     responseData.map((req: UserRegistrationResponse) => {
    //         req.name = req.firstName + ' ' + req.lastName;
    //     })
    //     return responseData as any;
    // }

    // /** Get account details by user id */
    // async getAccountDetails(username: string) {
    //     let responseData: Account[] = [];
    //     await axios.get(APIURL.GET_ACCOUNT_BY_USERID + username).then(res => responseData = res.data);
    //     console.log(responseData)
    //     return responseData;
    // }

    // /** ADMIN - Get all user accounts */
    // async getAllUsersNamesAdmin() {
    //     let responseData: string[] = [];
    //     await axios.get(APIURL.ALL_USERS).then(res => responseData = res.data);
    //     return responseData as string[];
    // }

    // /** ADMIN - Get all the User Accounts */
    // async getAllAccountDetails() {
    //     let responseData: any = [];
    //     await axios.get(APIURL.GET_ALL_ACCOUNTS).then(res => responseData = res.data);
    //     return responseData;
    // }

    // /** USER - Get all account relates transactions */
    // async getAllTransactionsByAccount(number: string) {
    //     let responseData: Transactions[] = [];
    //     await axios.get(APIURL.TRANSACTIONS_BY_ACCOUNT_NUMBER + number).then(res => responseData = res.data);
    //     return responseData;
    // }

    // /** USER - Get all account relates transfers */
    // async getAllTransfersByAccount(number: string) {
    //     let responseData: TransfersModel[] = [];
    //     await axios.get(APIURL.TRANSFERS_BY_ACCOUNT_NUMBER + number).then(res => responseData = res.data);
    //     return responseData;
    // }

    // /** Initiate close account by User */
    // async initiateCloseAccount(data: InitiateCloseRequest) {
    //     let responseData = {};
    //     await axios.post(APIURL.INITIATE_CLOSURE, data).then(res => responseData = res.data);
    //     return responseData as any;
    // }

    // /** Initiate close account by User */
    // async requestToCreateNewAccount(data: any) {
    //     let responseData = '';
    //     await axios.post(APIURL.CREATE_USER_ACCOUNT, data).then(res => responseData = res.data);
    //     return responseData as string;
    // }


    // /** Get all accoun for closure - ADMIN */
    // async getAllAccountClosureRequest() {
    //     let responseData: any = [];
    //     await axios.get(APIURL.GET_ALL_CLOSURE_REQUEST).then(res => responseData = res.data);
    //     return responseData;
    // }

    // /** Finalize close account by User - ADMIN*/
    // async finalizeCloseAccount(data: CloseAccountRequest) {
    //     let responseData = '';
    //     await axios.post(APIURL.CLOSE_ACCOUNT, data).then(res => responseData = res.data);
    //     return responseData as string;
    // }

}

export const userService = new UserService();