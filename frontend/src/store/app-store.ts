import { observable, action, computed } from "mobx";

class AppStore {
    constructor() {

    }
    @observable appName: string = "Autism Detection";
    @observable isUserLoggedin: boolean = false;

    /** Login Service */
    @action.bound
    login() {
        this.isUserLoggedin = true;
    }

}

export const appStore = new AppStore();