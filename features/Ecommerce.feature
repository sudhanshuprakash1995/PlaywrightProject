Feature: Ecommerce validations

    Scenario: Placing an order
        Given Login to ecommerce application with "anshika@gmail.com" and "Iamking@000"
        When add "zara coat 3" to cart
        Then verify "zara coat 3" is added to the cart
        When Enter valid details and place the order
        Then verify order is present in the OrderHistory

    Feature Description