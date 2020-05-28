import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    expression : []
  }

  onClickOperator = (value) => {

    let newExp = null;
    let explength = this.state.expression.length;
    let lastElem = this.state.expression[explength - 1];

    if(!lastElem) {
      if(['*', '+', '-', '/', '.'].includes(value)) {
        return;
      } else {
        newExp = this.state.expression.concat(value);
      }
    } else if( lastElem && ['*', '+', '-', '/', '.'].includes(value)) {
      if(lastElem[lastElem.length -1] === '.') {
        return;
      } 
      
      if(value === '.') {
        if(['*', '+', '-', '/', '.'].includes(lastElem)) {
          return;
        }
        let newValue = lastElem + value;
        newExp = this.updateExpression(this.state.expression, explength - 1, newValue);
      } else {
        if(explength !== 1) {
          return;
        }
        newExp = this.state.expression.concat(value);
      }
    } else if(lastElem && !lastElem.includes('.')) {
      if(lastElem.length < 5) {
        if(!['*', '+', '-', '/'].includes(lastElem)) {
          let newValue = lastElem + value;
          newExp = this.updateExpression(this.state.expression, explength - 1, newValue);
        } else {
          newExp = this.state.expression.concat(value);
        }
      } else {
        return;
      }
    } else if(lastElem && lastElem.includes('.')) {
      let lastElemArr = lastElem.split('.');
      if(lastElemArr[1].length < 4) {
        let newValue = lastElem + value;
        newExp = this.updateExpression(this.state.expression, explength - 1, newValue);
      } else {
        return;
      }
    }
    
    this.setState({ expression : newExp });
  }

  updateExpression = (exp, index, value) => {
    let newExp = exp.map((ex, ind) => {
      if(ind === index) {
        return value;
      }
      return ex;
    });

    return newExp;
  }

  calculateResult = () => {
    let explength = this.state.expression.length;
    let lastElem = this.state.expression[explength - 1];

    if(explength === 3 && lastElem[lastElem.length -1] !== '.') {
      const operator = this.state.expression[1];
      let result = null;

      switch(operator) {
        case '+' :
          result = Number(this.state.expression[0]) + Number(this.state.expression[2]);
          break; 
        case '*' :
          result = Number(this.state.expression[0]) * Number(this.state.expression[2]);
          break;
        case '-' :
          result = Number(this.state.expression[0]) - Number(this.state.expression[2]);
          break;
        case '/' :
          result = Number(this.state.expression[0]) / Number(this.state.expression[2]);
          break;

        default : return;
      }

      result = result !== null ? String(result) : null;

      if(result) {
        this.setState({ expression : [result]})
      } else {
        return;
      }
    } else {
      return;
    }
  }

  onClear = () => {
    this.setState({ expression : [] });
  }

  render() {
    return (
      <React.Fragment>
        <h2 style={{textAlign : 'center'}}>Calculator</h2>
        <div className="DivAlign">
          <input className="Input" type="text" value={this.state.expression.join(' ')} disabled/>
          <table className="Table">
            <tr>
              <td onClick={() => this.onClickOperator('7')}>7</td>
              <td onClick={() => this.onClickOperator('8')}>8</td>
              <td onClick={() => this.onClickOperator('9')}>9</td>
              <td onClick={() => this.onClickOperator('*')}>*</td>
            </tr>
            <tr>
              <td onClick={() => this.onClickOperator('4')}>4</td>
              <td onClick={() => this.onClickOperator('5')}>5</td>
              <td onClick={() => this.onClickOperator('6')}>6</td>
              <td onClick={() => this.onClickOperator('-')}>-</td>
            </tr>
            <tr>
              <td onClick={() => this.onClickOperator('1')}>1</td>
              <td onClick={() => this.onClickOperator('2')}>2</td>
              <td onClick={() => this.onClickOperator('3')}>3</td>
              <td onClick={() => this.onClickOperator('+')}>+</td>
            </tr>
            <tr>
              <td onClick={() => this.onClickOperator('/')}>/</td>
              <td onClick={() => this.onClickOperator('0')}>0</td>
              <td onClick={() => this.onClickOperator('.')}>.</td>
              <td onClick={this.calculateResult}>=</td>
            </tr>
          </table>
          <button style={{ marginLeft : '130px', marginTop : '20px', cursor : 'pointer'}} onClick={this.onClear}>Clear</button>
        </div>
        
      </React.Fragment>
    );
  }
}

export default App;
