import { observable, action } from "mobx";
import { userService } from "../services/user-services";

class AppStore {
    constructor(){
        this.getPatientsList();
    }

    @observable appName: string = "Autism Detection";
    @observable isUserLoggedin: boolean = false;
    @observable userList = [] as PatientList[];

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

}

export const appStore = new AppStore();