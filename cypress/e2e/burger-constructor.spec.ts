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
  });

  it('should allow dragging ingredients into the constructor', function () {
    cy.get('[data-testid="ingredient-item"]').first().trigger('dragstart');
    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');

    cy.get('[data-testid="bun-top"]').should('exist');

    cy.get('[data-testid="ingredient-item"]').eq(1).trigger('dragstart');
    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');

    cy.get('[data-testid="ingredient-list"]')
      .children()
      .should('have.length', 1);
  });

  it('should allow adding ingredients to the constructor and calculating the price', function () {
    cy.get('[data-testid="ingredient-item"]').eq(0).trigger('dragstart');
    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');

    cy.get('[data-testid="ingredient-item"]').eq(1).trigger('dragstart');
    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');

    cy.get('[data-testid="total-price"]').should('have.text', 'Стоимость: 500');
  });

  it('should show the modal window after placing an order', function () {
    cy.get('[data-testid="ingredient-item"]').first().trigger('dragstart');
    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');
    cy.get('[data-testid="ingredient-item"]').eq(1).trigger('dragstart');
    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');

    cy.get('[data-testid="place-order-button"]').click();

    cy.get('[data-testid="order-modal"]').should('be.visible');
    cy.get('[data-testid="order-number"]').should('exist');
  });

  it('should display correct order details in the modal', function () {
    cy.get('[data-testid="ingredient-item"]').first().trigger('dragstart');
    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');
    cy.get('[data-testid="ingredient-item"]').eq(1).trigger('dragstart');
    cy.get('[data-testid="burger-constructor-drop-zone"]').trigger('drop');

    cy.get('[data-testid="place-order-button"]').click();

    cy.get('[data-testid="order-modal"]').should('be.visible');
    cy.get('[data-testid="order-number"]').should('not.be.empty');
  });
});
