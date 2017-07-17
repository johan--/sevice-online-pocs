import { UberPage } from './app.po';

describe('uber App', () => {
  let page: UberPage;

  beforeEach(() => {
    page = new UberPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
