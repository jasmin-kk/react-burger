import { Ingredient } from '../../src/utils/data';

interface Context {
  ingredients: Ingredient[];
}

describe('Burger Constructor Page', function () {
  beforeEach(function () {
    cy.visit('/');
    cy.fixture('ingredients').then((ingredients) => {
      this.ingredients = ingredients as Ingredient[];
    });

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'mocked_token',
      },
    }).as('mockLogin');

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      statusCode: 200,
      body: {
        order: {
          number: 123456,
        },
      },
    }).as('mockOrder');
  });

  it('should allow dragging ingredients into the constructor', function () {
    cy.get('[data-testid="ingredient-item"]').first().trigger('dragstart');
    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');
    cy.get('.test-bun-top').should('exist');

    cy.get('[data-testid="ingredient-item"]').eq(1).trigger('dragstart');
    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');
    cy.get('[data-testid="ingredient-list"]')
      .children()
      .should('have.length.greaterThan', 0);

    it('should allow adding ingredients to the constructor and calculating the price', function () {
      cy.get('[data-testid="ingredient-item"]').eq(0).trigger('dragstart');
      cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');

      cy.get('[data-testid="ingredient-item"]').eq(1).trigger('dragstart');
      cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');

      cy.get('[data-testid="total-price"]')
        .invoke('text')
        .should('match', /\d+/);
    });

    it('should show the modal window after placing an order', function () {
      cy.get('[data-testid="ingredient-item"]').first().trigger('dragstart');
      cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');
      cy.get('[data-testid="ingredient-item"]').eq(1).trigger('dragstart');
      cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');

      cy.get('[data-testid="place-order-button"]').click();

      cy.get('[data-testid="order-modal"]').should('be.visible');
      cy.get('[data-testid="order-number"]')
        .should('exist')
        .and('have.text', '123456');
    });

    it('should display correct order details in the modal', function () {
      cy.get('[data-testid="ingredient-item"]').first().trigger('dragstart');
      cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');
      cy.get('[data-testid="ingredient-item"]').eq(1).trigger('dragstart');
      cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');

      cy.get('[data-testid="place-order-button"]').click();

      cy.get('[data-testid="order-modal"]').should('be.visible');
      cy.get('[data-testid="order-number"]')
        .should('not.be.empty')
        .and('match', /\d+/);
    });
  });
});
