class PrototipoStory {
    constructor() {
        this.pages = [];
    }
    dismount(){}
    mount(){}
    listAllPages() {
        return this.pages.map(page => page.name);
    }
}

export { PrototipoStory };