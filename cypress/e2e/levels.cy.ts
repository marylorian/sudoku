const levels = [
  { id: '4x4-easy', size: 4, difficulty: 'easy' },
  { id: '4x4-medium', size: 4, difficulty: 'medium' },
  { id: '4x4-hard', size: 4, difficulty: 'hard' },
  { id: '6x6-easy', size: 6, difficulty: 'easy' },
  { id: '6x6-medium', size: 6, difficulty: 'medium' },
  { id: '6x6-hard', size: 6, difficulty: 'hard' },
  { id: '9x9-easy', size: 9, difficulty: 'easy' },
  { id: '9x9-medium', size: 9, difficulty: 'medium' },
  { id: '9x9-hard', size: 9, difficulty: 'hard' }
];

describe('Sudoku levels', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('exposes accessible game landmarks and controls', () => {
    cy.get('[role="heading"]').contains('Sudoku Levels').should('exist');
    cy.get('[aria-label="4 by 4 sudoku board"]').should('exist');
    cy.get('[aria-label="Number pad"]').should('exist');
    cy.get('[aria-label="Clear selected cell"]').should('exist');
  });

  levels.forEach((level) => {
    it(`opens and plays accessible ${level.id}`, () => {
      cy.get(`[data-testid="level-${level.id}"]`).click();
      cy.contains(
        `${level.size} x ${level.size} board, ${level.difficulty} difficulty`
      ).should('exist');
      cy.get(
        `[aria-label="${level.size} by ${level.size} sudoku board"]`
      ).should('exist');
      cy.get(
        `[aria-label="${level.size} x ${level.size} ${level.difficulty} level"]`
      ).should('have.attr', 'role', 'tab');
      cy.get('[data-testid="sudoku-board"]').should('exist');
      cy.get('[data-testid^="cell-"]').should(
        'have.length',
        level.size * level.size
      );
      cy.get('[data-testid="number-pad"]').within(() => {
        cy.get('[data-testid^="number-"]').should(
          'have.length',
          level.size + 1
        );
      });
    });
  });
});
