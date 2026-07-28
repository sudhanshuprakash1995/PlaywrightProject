import { expect } from '@playwright/test'
import { locators } from "../locators/locators";

class KaiChatBot {
    constructor(page) {
        this.page = page
        this.modelContainer = page.locator(locators.modelSelector)
        this.modelList = page.locator(locators.modelOptionValue)
        this.replies = page.locator(locators.botResponse);
        this.closeTourButton = page.locator(locators.closeTour);
        // this.closeTourButton = page.getByRole('button', { name: locators.closeTour })
        // this.tourSkip = page.getByRole('button', { name: 'Skip' })
    }

    async selectModel(modelName) {
        // this.page = page
        // await this.page.pause()
        await this.modelContainer.waitFor({ state: 'visible', timeout: 10000 });
        await this.modelContainer.click({ delay: 500 });
        await this.modelList.first().waitFor({ state: 'visible', timeout: 10000 });

        const agent = this.modelContainer.getByText(modelName);
        await agent.waitFor({ state: 'visible' });
        await agent.click({ delay: 500 });

        await expect(this.modelContainer).toHaveText(modelName);
        console.log(`Selected model: ${modelName}`);
    }

    async getReply(index = 0, timeout = 10000) {
        const botReplies = this.replies
        // console.log("Index ",index," value",await botReplies.count()," ",await botReplies.nth(index))
        // Wait until we have at least (index + 1) replies
        const reply = botReplies.nth(index);
        await reply.waitFor({ state: 'visible', timeout });
        await expect(botReplies).toHaveCount(index + 1, { timeout });

        return reply;
    }

    async closeTour() {
    try {
        await this.closeTourButton.waitFor({
            state: 'visible',
            timeout: 15000
        });

        console.log('Tour popup detected → Closing it...');

        await this.closeTourButton.click();

        await this.closeTourButton.waitFor({
            state: 'hidden',
            timeout: 5000
        });

        console.log('Tour popup closed successfully.');

    } catch (error) {
        console.log('No tour popup shown, continuing...');
    }
}

    // async closeTour(page) {


    //     try {
    //         // Wait for the tour popup close button to appear
    //         await this.closeTourButton.waitFor({state: 'visible', timeout: 15000});
    //         console.log('Tour popup detected → Closing it...');
    //         await this.closeTourButton.click();

    //         // Optional: Wait for it to disappear
    //         if(await this.closeTourButton.waitFor({ state: 'visible', timeout: 5000 })){
    //             console.log('Tour popup is still there!');
    //         }
    //         else{
    //             console.log('Tour popup closed successfully.');
    //         }
            
    //         // await this.page.getByText('Welcome,').click()

    //     } catch (error) {
    //         // Tour did not appear - this is expected behavior
    //         console.log('No tour popup shown, continuing...',error);
    //     }
    // }
}

export { KaiChatBot }