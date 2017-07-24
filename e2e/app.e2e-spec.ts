import { TreeViewerPage } from './app.po';

describe('tree-viewer App', () => {
  let page: TreeViewerPage;

  beforeEach(() => {
    page = new TreeViewerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
