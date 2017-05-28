import { InvoicePage } from './app.po';

describe('invoice App', () => {
  let page: InvoicePage;

  beforeEach(() => {
    page = new InvoicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
