describe('user registration', () => {
  it('returns User registered successfully on successfull registration', () => {
    cy.visit('http://localhost:5500/register.html')


    // change the details in the auto fill because once they register 
    // once when you retry it would fail because the email is allready in the 
    // database and it only affects unique emails

    cy.get('#full-name').type('John Doe');
    cy.get('#cohort_number').type('17');
    cy.get('#email').type('benard.siloma@gmail.com');
    cy.get('#password').type('12345678');
    cy.get('#password2').type('12345678');

    cy.get('#submit').click();

    cy.get("#notifications-reg").contains("User registered successfully")

    
  })

  it('returns fill all field incase a field iis not filled', () => {
    cy.visit('http://localhost:5500/register.html')

    
    cy.get('#cohort_number').type('17');
    cy.get('#email').type('benard1.siloma@gmail.com');
    cy.get('#password').type('12345678');
    cy.get('#password2').type('12345678');

    cy.get('#submit').click();

    cy.get("#notifications-reg").contains("fill all fields")


  })

})