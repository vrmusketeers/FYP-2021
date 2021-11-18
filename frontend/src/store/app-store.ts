import { observable, action } from "mobx";
import { userService } from "../services/user-services";

class AppStore {

    @observable appName: string = "Autism Detection";
    @observable isUserLoggedin: boolean = false;

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
        return await userService.registerExistingUser();
    }

}

export const appStore = new AppStore();