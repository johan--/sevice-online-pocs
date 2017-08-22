import { UiFrontendPage } from './app.po';

describe('ui-frontend App', () => {
  let page: UiFrontendPage;

  beforeEach(() => {
    page = new UiFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
