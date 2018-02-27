// This is the placeholder suite to place custom tests in
// Use testCase(options) for a more convenient setup of the test cases
suite('Custom Automation Tests for px-vis-histogram', () => {
  test('Check initial value of counter', done => {
    let counterEl = fixture('px-vis-histogram-fixture'),
        counterValueEl = counterEl.shadowRoot.querySelector('span');
    debugger;
    assert.equal(counterValueEl.textContent, '0');
    done();
  });

  test('Clicking px-vis-histogram increments the counter', done => {
    let counterEl = fixture('px-vis-histogram-fixture'),
        counterValueEl = counterEl.shadowRoot.querySelector('span');
    assert.equal(counterValueEl.textContent, '0');

    counterEl.click();
    flush(function(){
      assert.equal(counterValueEl.textContent, '1');
    });
    done();
  });
});
