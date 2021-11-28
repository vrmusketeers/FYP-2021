import { observable, action, computed } from "mobx";
import { userService } from "../services/user-services";

class AppStore {
    constructor() {
        this.getPatientsList();
    }

    @observable appName: string = "Autism Detection";
    @observable isUserLoggedin: boolean = false;
    @observable userList = [] as PatientList[];
    @observable userProfile = {} as PatientList;
    @observable patientTestReports: any;

    /** Login Service */
    @action.bound
    login() {
        this.isUserLoggedin = true;
    }

    /** Logout Service */
    @action.bound
    logout() {
        this.isUserLoggedin = false;
    }

    /** Get list of patients */
    @action.bound
    async getPatientsList() {
        this.userList = await userService.registerExistingUser();
    }

    @action.bound
    async getPatientTestReports(userId: string) {
        this.patientTestReports = await userService.getPatientTestDetails(userId);
    }

    @action.bound
    get patientList() {
        return this.userList;
    }
    @computed
    getUsersProfile() {
        return this.userProfile;
    }

    /** Get User Profile by ID */
    @action.bound
    async getUserById(userId: string) {
        this.userProfile = await userService.getUserById(userId);
    }

}

export const appStore = new AppStore();