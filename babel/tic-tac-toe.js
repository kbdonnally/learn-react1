if (document.querySelector('body.tic-tac-toe')) {

// 1. Square on board
function Square(props) {
	return (
		<button 
			className="square"
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}

// 2. Game board
class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square 
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

// 3. Game wrapper
class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		};
	}

	// what to do if click a square
	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1); // entire array of history states
		const current = history[history.length - 1]; // current game state
		const squares = [...current.squares]; // array of length 9

		if (calculateWinner(squares) || squares[i]) {
			return; // return early if they don't return null
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O'; // if null, assign X or O

		// update history & whose turn it is
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	// time travel feature
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

	// render game
	render() {
		const history = this.state.history; 
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares); // see fxn at bottom
		// creates functional component here basically
		// entire contents of <ol>, series of components
		const moves = history.map( (step, move) => {
			const desc = move ?
				`Go to move #${move}` :
				'Go to game start'; // if move true, go to move, else go to start
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});

		let status; // whose turn it is or who won
		// determine status
		if (winner) {
			status = `Winner: ${winner}`;
		} else {
			status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
		}

		// what to show
		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);

// ========================================

// 1. Declare winner function
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i=0; i < lines.length; i++) {
		const [a, b, c] = lines[i]; // didn't know you could do this syntax!
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]; // winner is whatever is in that square
		}
	}
	return null; // else
}

} // end if statement