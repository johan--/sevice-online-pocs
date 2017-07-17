import { UberCamerounPage } from './app.po';

describe('uber-cameroun App', () => {
  let page: UberCamerounPage;

  beforeEach(() => {
    page = new UberCamerounPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
