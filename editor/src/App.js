import React from 'react';
import './App.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    let monsters = [];
    for (let i = 0; i < 20; i++) {
      monsters.push(i);
    }

    let fields = [];
    for (let i = 0; i < 49; i++) {
      fields.push({p: i, t: null});
    }

    this.state = {
      monsters,
      fields,
      current: 0
    };

    this.setMonster = this.setMonster.bind(this);
    this.setField = this.setField.bind(this);
  }

  setMonster(val) {
    this.setState({
      current: val
    })
  }

  setField(p) {
    this.setState(prevState => {
      const _fields = [...prevState.fields];
      _fields[p] = {p, t: this.state.current};
        return {
          fields: _fields
        }
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="app">
        <p>Pick the monster to place</p>
        <div>
          <input
            key={'zero'}
            type={"button"}
            value={'CLEAR'}
            disabled={this.state.current === null}
            onClick={() => this.setMonster(null)}
          />
          {this.state.monsters.map(val => {
            return <input
              key={val}
              type={"button"}
              value={val}
              className={(val.p + 1) % 5 === 0 ? 'boss' : ''}
              disabled={this.state.current === val}
              onClick={() => this.setMonster(val)}
              />;
          })}
        </div>

        <div>
          {this.state.fields.map(val => {
            if (val.p % 7 === 0) {
              return <div className="btn" key={val.p}>
                <br/>
                <input
                  type={"button"}
                  value={val.t !== null ? val.t : ''}
                  onClick={() => this.setField(val.p)}
                />
              </div>;
            }
            return <div className="btn" key={val.p}>
              <input
                type={"button"}
                value={val.t !== null ? val.t : ''}
                onClick={() => this.setField(val.p)}
              />
            </div>;
          })}
        </div>
      </div>
    );
  }
}

export default App;
