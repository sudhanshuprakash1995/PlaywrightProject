import { LoginPage } from './loginPage';
import { DashBoardPage } from './dashBoardPage';
import { Checkout } from './Checkout';

class POManager{
    constructor(page){
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