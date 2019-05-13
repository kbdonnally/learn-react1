// 1. Square on board
function Square(props) {
  return React.createElement("button", {
    className: "square",
    onClick: props.onClick
  }, props.value);
} // 2. Game board


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  renderSquare(i) {
    return React.createElement(Square, {
      value: this.state.squares[i],
      onClick: () => this.handleClick(i)
    });
  }

  handleClick(i) {
    const squares = { ...this.state.squares
    };
    squares[i] = 'X';
    this.setState({
      squares: squares
    });
  }

  render() {
    const status = 'Next player: X';
    return React.createElement("div", null, React.createElement("div", {
      className: "status"
    }, status), React.createElement("div", {
      className: "board-row"
    }, this.renderSquare(0), this.renderSquare(1), this.renderSquare(2)), React.createElement("div", {
      className: "board-row"
    }, this.renderSquare(3), this.renderSquare(4), this.renderSquare(5)), React.createElement("div", {
      className: "board-row"
    }, this.renderSquare(6), this.renderSquare(7), this.renderSquare(8)));
  }

} // 3. Game wrapper


class Game extends React.Component {
  render() {
    return React.createElement("div", {
      className: "game"
    }, React.createElement("div", {
      className: "game-board"
    }, React.createElement(Board, null)), React.createElement("div", {
      className: "game-info"
    }, React.createElement("div", null), React.createElement("ol", null)));
  }

} // ========================================


ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));