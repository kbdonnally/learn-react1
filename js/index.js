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
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  renderSquare(i) {
    return React.createElement(Square, {
      value: this.state.squares[i],
      onClick: () => this.handleClick(i)
    });
  }

  handleClick(i) {
    const squares = [...this.state.squares]; // spread syntax

    squares[i] = this.state.xIsNext ? 'X' : 'O'; // ternary operator

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      // if xIsNext true, pick it, else pick O
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

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


ReactDOM.render(React.createElement(Game, null), document.getElementById('root')); // ========================================
// 1. Declare winner function

function calculateWinner(squares) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // didn't know you could do this syntax!

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // winner is whatever is in that square
    }
  }

  return null; // else
}