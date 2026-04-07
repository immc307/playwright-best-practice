import  {type Locator, type Page} from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly loginSubmit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('[data-test="email"]');
        this.password = page.locator('[data-test="password"]');
        this.loginSubmit = page.locator('[data-test="login-submit"]');
    }

    async goto() {
        await this.page.goto("/auth/login");
    }

    async login(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginSubmit.click();
    }
}