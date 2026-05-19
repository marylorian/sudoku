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
    cy.get('[data-testid="main-menu"]').should('exist');
    cy.get('[role="heading"]').contains('Sudoku Levels').should('exist');
    cy.contains("Let's go").should('exist');
    cy.contains('Choose a level').should('exist');

    cy.get('[data-testid="start-next-level"]').click();

    cy.get('[aria-label="4 by 4 sudoku board"]').should('exist');
    cy.get('[aria-label="Number pad"]').should('exist');
    cy.get('[aria-label="Clear selected cell"]').should('exist');
    cy.get('[data-testid="reset-board-button"]').should('exist');
  });

  it('confirms before resetting user-added numbers', () => {
    cy.get('[data-testid="start-next-level"]').click();
    cy.get('[data-testid="cell-0-0"]').click();
    cy.get('[data-testid="number-1"]').click();
    cy.get('[aria-label="Row 1, column 1, value 1"]').should('exist');

    cy.get('[data-testid="reset-board-button"]').click();
    cy.get('[data-testid="reset-confirmation"]').should('exist');
    cy.get('[data-testid="cancel-reset-button"]').click();
    cy.get('[data-testid="reset-confirmation"]').should('not.exist');
    cy.get('[aria-label="Row 1, column 1, value 1"]').should('exist');

    cy.get('[data-testid="reset-board-button"]').click();
    cy.get('[data-testid="confirm-reset-button"]').click();
    cy.get('[data-testid="reset-confirmation"]').should('not.exist');
    cy.get('[aria-label="Row 1, column 1, empty"]').should('exist');
  });

  levels.forEach((level) => {
    it(`opens and plays accessible ${level.id}`, () => {
      cy.get('[data-testid="choose-level-button"]').click();
      cy.get('[data-testid="level-select-screen"]').should('exist');
      cy.get('[role="heading"]')
        .contains('Choose from existing levels')
        .should('exist');
      cy.get(`[data-testid="level-${level.id}"]`).click();
      cy.contains(
        `${level.size} x ${level.size} board, ${level.difficulty} difficulty`
      ).should('exist');
      cy.get(
        `[aria-label="${level.size} by ${level.size} sudoku board"]`
      ).should('exist');
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
