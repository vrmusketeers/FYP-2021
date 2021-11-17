import { observable, action } from "mobx";

class AppStore {

    @observable appName: string = "Autism Detection";
    @observable isUserLoggedin: boolean = false;

    /** Login Service */
    @action.bound
    login() {
        this.isUserLoggedin = true;
    }

}

export const appStore = new AppStore();