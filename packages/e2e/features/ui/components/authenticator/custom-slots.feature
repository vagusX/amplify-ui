Feature: Sign Up with Attributes

  Amazon Congito User Pools allow for standard OAuth attributes to be required:
  > https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
  These are automatically persisted to `aws-exports.js` and rendered by the Authenticator.

  Background:
    Given I'm running the example "ui/components/authenticator/custom-slots"

@angular @react @vue
  Scenario: Has Confirm Reset Password Verify User Footer and Header slot text
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "verify-user-email"
    When I click the "Reset Password" button
    Then I see "Enter Information:"
    Then I type my "email" with status "UNVERIFIED"
    And I click the "Send Code" button
    Then I see "Code"
    Then I see "Enter Information:"
    Then I see "Footer Information"

@angular @react @vue
  Scenario: Has Setup TOTP Verify User Footer and Header slot text
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Enter Information:"
    Then I see "Footer Information"

  Scenario: Has confirm sign in Footer and Header slot text
    When I type my "email" with status "UNVERIFIED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Enter Information:"
    Then I see "Footer Information"

  Scenario: Has reset password in Footer and Header slot text
    When I click the "Reset Password" button
    Then I see "Enter Information:"
    Then I see "Footer Information"

  @angular @react @vue
  Scenario: Has a custom Header slot logo
    Then I see the "Amplify logo" image

  @angular @react @vue
  Scenario: Has custom Footer slot text
    Then I see "© All Rights Reserved"

  @angular @react @vue
  Scenario: Has custom Sign In Header slot text
    Then I see "Sign in to your account"

  @angular @react @vue
  Scenario: Has custom Sign In Footer slot text
    Given I see "Reset Password"
    When I click "Reset Password"
    And I see "Send code"

  @angular @react @vue
  Scenario: Has custom Sign Up Header slot text
    When I click the "Create Account" tab
    Then I see "Create a new account"

  @angular @react @vue
  Scenario: Has custom Sign Up Footer slot text
    When I click the "Create Account" tab
    Then I see "Back to Sign In"
    When I click "Back to Sign In"
    Then I see "Sign in to your account"


@angular @react @vue  
  Scenario: Has custom Confirm Sign Up Footer and Header slot text
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    When I click the "Create Account" tab
    When I type a new "email"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    Then I see "Enter Information:"
    Then I see "Footer Information"
