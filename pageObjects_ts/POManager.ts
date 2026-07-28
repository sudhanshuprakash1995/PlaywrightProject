import { LoginPage } from './loginPage';
import { DashBoardPage } from './dashBoardPage';
import { Checkout } from './Checkout';
import { Page } from '@playwright/test';

class POManager{
    loginPage: LoginPage;
    dashBoardPage: DashBoardPage;
    checkout: Checkout;
    page: Page
    constructor(page: any){
        this.page = page
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
        this.checkout = new Checkout(this.page)

    }

    getLoginPage(){
        return this.loginPage
    }
    getDashboardPage(){
        return this.dashBoardPage
    }

    getCheckout(){
        return this.checkout
    }
}

export { POManager };