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
      current: 0,
      level: []
    };

    this.setMonster = this.setMonster.bind(this);
    this.setField = this.setField.bind(this);
    this.saveStage = this.saveStage.bind(this);
    this.newLevel = this.newLevel.bind(this);
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

  saveStage() {
    const _filteredFields = this.state.fields.filter(val => {
      return val.t !== null;
    });
    let fields = [];
    for (let i = 0; i < 49; i++) {
      fields.push({p: i, t: null});
    }
    this.setState(prevState => {
      const _level = [...prevState.level];
      _level.push(_filteredFields);
      return {
        level: _level,
        fields
      }
    });
  }

  newLevel() {
    let fields = [];
    for (let i = 0; i < 49; i++) {
      fields.push({p: i, t: null});
    }
    this.setState(prevState => {
      return {
        level: [],
        fields
      }
    });
  }

  render() {
    return (
      <div className="app">
        <p>Pick the monster to place</p>
        <div>
          <div key={'zero'}>
            <input
              type={"button"}
              value={'CLEAR'}
              disabled={this.state.current === null}
              onClick={() => this.setMonster(null)}
            />
          </div>
          {this.state.monsters.map(val => {
            return <div className={"btn"} key={val}>
            {val > 0 && val % 5 === 0 && <br/>}
            <input
              type={"button"}
              value={val}
              className={(val + 1) % 5 === 0 ? 'boss' : ''}
              disabled={this.state.current === val}
              onClick={() => this.setMonster(val)}
            />
            </div>;
          })}
        </div>

        <p>Place it on the board</p>
        <div>
          {this.state.fields.map(val => {
            return <div className="btn" key={val.p}>
              {val.p > 0 && val.p % 7 === 0 && <br/>}
              <input
                type={"button"}
                value={val.t !== null ? val.t : ''}
                className={(val.t + 1) % 5 === 0 ? 'boss' : ''}
                onClick={() => this.setField(val.p)}
              />
            </div>;
          })}
        </div>
        <div>
          <input type={"button"} value={"Save stage & create new"} style={{width: '385px'}} onClick={this.saveStage}/>
        </div>
        <div>
          <input type={"button"} value={"New level"} style={{width: '385px'}} onClick={this.newLevel}/>
        </div>
        <textarea style={{width: '385px'}} value={JSON.stringify(this.state.level)} readOnly={true}/>
      </div>
    );
  }
}

export default App;
