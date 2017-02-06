describe('Home', () => {

  beforeEach( () => {
    browser.get('/');
  });

  it('should have a list of songs', () => {
    expect(element(by.css('sd-home ul')).getText())
      .toEqual('Sandra Lauer - (I''ll never be) Maria Magdalena\nElvis Presley - (Marie''s the name) his latest flame\nHarry Vermeegen - 1-2-3-4 Dennis bier');
  });

});
