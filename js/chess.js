// Chess Game Implementation
class ChessGame {
  constructor() {
    this.board = this.initializeBoard();
    this.currentPlayer = 'white';
    this.selectedSquare = null;
    this.gameStatus = 'active';
    this.moveHistory = [];
    this.kings = { white: { row: 7, col: 4 }, black: { row: 0, col: 4 } };
    this.isInCheck = { white: false, black: false };
    
    this.initializeUI();
    this.renderBoard();
  }

  // Chess piece Unicode symbols
  pieceSymbols = {
    white: {
      king: '♔', queen: '♕', rook: '♖', 
      bishop: '♗', knight: '♘', pawn: '♙'
    },
    black: {
      king: '♚', queen: '♛', rook: '♜', 
      bishop: '♝', knight: '♞', pawn: '♟'
    }
  };

  initializeBoard() {
    const board = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Set up black pieces
    board[0] = [
      {type: 'rook', color: 'black'}, {type: 'knight', color: 'black'}, 
      {type: 'bishop', color: 'black'}, {type: 'queen', color: 'black'}, 
      {type: 'king', color: 'black'}, {type: 'bishop', color: 'black'}, 
      {type: 'knight', color: 'black'}, {type: 'rook', color: 'black'}
    ];
    board[1] = Array(8).fill({type: 'pawn', color: 'black'});
    
    // Set up white pieces
    board[6] = Array(8).fill({type: 'pawn', color: 'white'});
    board[7] = [
      {type: 'rook', color: 'white'}, {type: 'knight', color: 'white'}, 
      {type: 'bishop', color: 'white'}, {type: 'queen', color: 'white'}, 
      {type: 'king', color: 'white'}, {type: 'bishop', color: 'white'}, 
      {type: 'knight', color: 'white'}, {type: 'rook', color: 'white'}
    ];
    
    return board;
  }

  initializeUI() {
    const boardElement = document.getElementById('chess-board');
    const resetButton = document.getElementById('reset-game');
    
    if (resetButton) {
      resetButton.addEventListener('click', () => this.resetGame());
    }
    
    // Create board squares
    boardElement.innerHTML = '';
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement('div');
        square.className = `chess-square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
        square.dataset.row = row;
        square.dataset.col = col;
        
        // Add event listeners
        square.addEventListener('click', (e) => this.handleSquareClick(e));
        square.addEventListener('dragover', (e) => e.preventDefault());
        square.addEventListener('drop', (e) => this.handleDrop(e));
        
        boardElement.appendChild(square);
      }
    }
  }

  renderBoard() {
    const squares = document.querySelectorAll('.chess-square');
    
    squares.forEach(square => {
      const row = parseInt(square.dataset.row);
      const col = parseInt(square.dataset.col);
      const piece = this.board[row][col];
      
      // Clear previous content and classes
      square.innerHTML = '';
      square.classList.remove('selected', 'valid-move', 'in-check');
      
      if (piece) {
        const pieceElement = document.createElement('span');
        pieceElement.textContent = this.pieceSymbols[piece.color][piece.type];
        pieceElement.draggable = piece.color === this.currentPlayer && this.gameStatus === 'active';
        pieceElement.style.cursor = pieceElement.draggable ? 'grab' : 'default';
        
        if (pieceElement.draggable) {
          pieceElement.addEventListener('dragstart', (e) => this.handleDragStart(e));
        }
        
        square.appendChild(pieceElement);
      }
      
      // Highlight selected square
      if (this.selectedSquare && 
          this.selectedSquare.row === row && 
          this.selectedSquare.col === col) {
        square.classList.add('selected');
      }
      
      // Highlight king in check
      if (piece && piece.type === 'king' && this.isInCheck[piece.color]) {
        square.classList.add('in-check');
      }
    });
    
    this.updateGameStatus();
  }

  handleSquareClick(e) {
    if (this.gameStatus !== 'active') return;
    
    const row = parseInt(e.currentTarget.dataset.row);
    const col = parseInt(e.currentTarget.dataset.col);
    const piece = this.board[row][col];
    
    if (this.selectedSquare) {
      // Try to make a move
      if (this.isValidMove(this.selectedSquare.row, this.selectedSquare.col, row, col)) {
        this.makeMove(this.selectedSquare.row, this.selectedSquare.col, row, col);
      }
      this.selectedSquare = null;
      this.clearValidMoveHighlights();
    } else if (piece && piece.color === this.currentPlayer) {
      // Select piece
      this.selectedSquare = { row, col };
      this.highlightValidMoves(row, col);
    }
    
    this.renderBoard();
  }

  handleDragStart(e) {
    const square = e.target.parentElement;
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);
    
    this.selectedSquare = { row, col };
    e.dataTransfer.setData('text/plain', `${row},${col}`);
    this.highlightValidMoves(row, col);
  }

  handleDrop(e) {
    e.preventDefault();
    if (this.gameStatus !== 'active') return;
    
    const data = e.dataTransfer.getData('text/plain');
    const [fromRow, fromCol] = data.split(',').map(Number);
    const toRow = parseInt(e.currentTarget.dataset.row);
    const toCol = parseInt(e.currentTarget.dataset.col);
    
    if (this.isValidMove(fromRow, fromCol, toRow, toCol)) {
      this.makeMove(fromRow, fromCol, toRow, toCol);
    }
    
    this.selectedSquare = null;
    this.clearValidMoveHighlights();
    this.renderBoard();
  }

  highlightValidMoves(row, col) {
    const validMoves = this.getValidMoves(row, col);
    
    validMoves.forEach(move => {
      const square = document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`);
      if (square) {
        square.classList.add('valid-move');
      }
    });
  }

  clearValidMoveHighlights() {
    document.querySelectorAll('.valid-move').forEach(square => {
      square.classList.remove('valid-move');
    });
  }

  getValidMoves(row, col) {
    const piece = this.board[row][col];
    if (!piece || piece.color !== this.currentPlayer) return [];
    
    let moves = [];
    
    switch (piece.type) {
      case 'pawn':
        moves = this.getPawnMoves(row, col, piece.color);
        break;
      case 'rook':
        moves = this.getRookMoves(row, col);
        break;
      case 'knight':
        moves = this.getKnightMoves(row, col);
        break;
      case 'bishop':
        moves = this.getBishopMoves(row, col);
        break;
      case 'queen':
        moves = [...this.getRookMoves(row, col), ...this.getBishopMoves(row, col)];
        break;
      case 'king':
        moves = this.getKingMoves(row, col);
        break;
    }
    
    // Filter out moves that would put own king in check
    return moves.filter(move => !this.wouldBeInCheck(row, col, move.row, move.col));
  }

  getPawnMoves(row, col, color) {
    const moves = [];
    const direction = color === 'white' ? -1 : 1;
    const startRow = color === 'white' ? 6 : 1;
    
    // Forward move
    if (this.isValidSquare(row + direction, col) && !this.board[row + direction][col]) {
      moves.push({ row: row + direction, col });
      
      // Double move from starting position
      if (row === startRow && !this.board[row + 2 * direction][col]) {
        moves.push({ row: row + 2 * direction, col });
      }
    }
    
    // Captures
    [-1, 1].forEach(colOffset => {
      const newRow = row + direction;
      const newCol = col + colOffset;
      if (this.isValidSquare(newRow, newCol)) {
        const target = this.board[newRow][newCol];
        if (target && target.color !== color) {
          moves.push({ row: newRow, col: newCol });
        }
      }
    });
    
    return moves;
  }

  getRookMoves(row, col) {
    const moves = [];
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    
    directions.forEach(([dRow, dCol]) => {
      for (let i = 1; i < 8; i++) {
        const newRow = row + i * dRow;
        const newCol = col + i * dCol;
        
        if (!this.isValidSquare(newRow, newCol)) break;
        
        const target = this.board[newRow][newCol];
        if (!target) {
          moves.push({ row: newRow, col: newCol });
        } else {
          if (target.color !== this.board[row][col].color) {
            moves.push({ row: newRow, col: newCol });
          }
          break;
        }
      }
    });
    
    return moves;
  }

  getKnightMoves(row, col) {
    const moves = [];
    const knightMoves = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    
    knightMoves.forEach(([dRow, dCol]) => {
      const newRow = row + dRow;
      const newCol = col + dCol;
      
      if (this.isValidSquare(newRow, newCol)) {
        const target = this.board[newRow][newCol];
        if (!target || target.color !== this.board[row][col].color) {
          moves.push({ row: newRow, col: newCol });
        }
      }
    });
    
    return moves;
  }

  getBishopMoves(row, col) {
    const moves = [];
    const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    
    directions.forEach(([dRow, dCol]) => {
      for (let i = 1; i < 8; i++) {
        const newRow = row + i * dRow;
        const newCol = col + i * dCol;
        
        if (!this.isValidSquare(newRow, newCol)) break;
        
        const target = this.board[newRow][newCol];
        if (!target) {
          moves.push({ row: newRow, col: newCol });
        } else {
          if (target.color !== this.board[row][col].color) {
            moves.push({ row: newRow, col: newCol });
          }
          break;
        }
      }
    });
    
    return moves;
  }

  getKingMoves(row, col) {
    const moves = [];
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    
    directions.forEach(([dRow, dCol]) => {
      const newRow = row + dRow;
      const newCol = col + dCol;
      
      if (this.isValidSquare(newRow, newCol)) {
        const target = this.board[newRow][newCol];
        if (!target || target.color !== this.board[row][col].color) {
          moves.push({ row: newRow, col: newCol });
        }
      }
    });
    
    return moves;
  }

  isValidSquare(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  isValidMove(fromRow, fromCol, toRow, toCol) {
    const validMoves = this.getValidMoves(fromRow, fromCol);
    return validMoves.some(move => move.row === toRow && move.col === toCol);
  }

  makeMove(fromRow, fromCol, toRow, toCol) {
    const piece = this.board[fromRow][fromCol];
    const capturedPiece = this.board[toRow][toCol];
    
    // Record move
    this.moveHistory.push({
      from: { row: fromRow, col: fromCol },
      to: { row: toRow, col: toCol },
      piece,
      capturedPiece
    });
    
    // Make the move
    this.board[toRow][toCol] = piece;
    this.board[fromRow][fromCol] = null;
    
    // Update king position
    if (piece.type === 'king') {
      this.kings[piece.color] = { row: toRow, col: toCol };
    }
    
    // Check for pawn promotion
    if (piece.type === 'pawn' && (toRow === 0 || toRow === 7)) {
      this.board[toRow][toCol] = { type: 'queen', color: piece.color };
    }
    
    // Switch players
    this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    
    // Update check status
    this.updateCheckStatus();
    
    // Check for checkmate or stalemate
    this.checkGameEnd();
  }

  wouldBeInCheck(fromRow, fromCol, toRow, toCol) {
    // Make temporary move
    const piece = this.board[fromRow][fromCol];
    const originalTarget = this.board[toRow][toCol];
    const originalKingPos = { ...this.kings[piece.color] };
    
    this.board[toRow][toCol] = piece;
    this.board[fromRow][fromCol] = null;
    
    if (piece.type === 'king') {
      this.kings[piece.color] = { row: toRow, col: toCol };
    }
    
    const inCheck = this.isKingInCheck(piece.color);
    
    // Restore board
    this.board[fromRow][fromCol] = piece;
    this.board[toRow][toCol] = originalTarget;
    this.kings[piece.color] = originalKingPos;
    
    return inCheck;
  }

  isKingInCheck(color) {
    const kingPos = this.kings[color];
    const opponentColor = color === 'white' ? 'black' : 'white';
    
    // Check if any opponent piece can attack the king
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.color === opponentColor) {
          const moves = this.getPieceMoves(row, col, piece);
          if (moves.some(move => move.row === kingPos.row && move.col === kingPos.col)) {
            return true;
          }
        }
      }
    }
    
    return false;
  }

  getPieceMoves(row, col, piece) {
    // Get moves without checking for check (to avoid infinite recursion)
    switch (piece.type) {
      case 'pawn':
        return this.getPawnMoves(row, col, piece.color);
      case 'rook':
        return this.getRookMoves(row, col);
      case 'knight':
        return this.getKnightMoves(row, col);
      case 'bishop':
        return this.getBishopMoves(row, col);
      case 'queen':
        return [...this.getRookMoves(row, col), ...this.getBishopMoves(row, col)];
      case 'king':
        return this.getKingMoves(row, col);
      default:
        return [];
    }
  }

  updateCheckStatus() {
    this.isInCheck.white = this.isKingInCheck('white');
    this.isInCheck.black = this.isKingInCheck('black');
  }

  checkGameEnd() {
    const currentPlayerMoves = this.getAllValidMoves(this.currentPlayer);
    
    if (currentPlayerMoves.length === 0) {
      if (this.isInCheck[this.currentPlayer]) {
        this.gameStatus = 'checkmate';
      } else {
        this.gameStatus = 'stalemate';
      }
    }
  }

  getAllValidMoves(color) {
    const moves = [];
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.color === color) {
          moves.push(...this.getValidMoves(row, col));
        }
      }
    }
    
    return moves;
  }

  updateGameStatus() {
    const statusElement = document.getElementById('game-status');
    if (!statusElement) return;
    
    let statusText = '';
    
    if (this.gameStatus === 'checkmate') {
      const winner = this.currentPlayer === 'white' ? 'Black' : 'White';
      statusText = `Checkmate! ${winner} wins!`;
    } else if (this.gameStatus === 'stalemate') {
      statusText = 'Stalemate! Game is a draw.';
    } else if (this.isInCheck[this.currentPlayer]) {
      statusText = `${this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1)} is in check`;
    } else {
      statusText = `${this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1)} to move`;
    }
    
    statusElement.textContent = statusText;
  }

  resetGame() {
    this.board = this.initializeBoard();
    this.currentPlayer = 'white';
    this.selectedSquare = null;
    this.gameStatus = 'active';
    this.moveHistory = [];
    this.kings = { white: { row: 7, col: 4 }, black: { row: 0, col: 4 } };
    this.isInCheck = { white: false, black: false };
    
    this.clearValidMoveHighlights();
    this.renderBoard();
  }
}

// Initialize the chess game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('chess-board')) {
    window.chessGame = new ChessGame();
  }
});