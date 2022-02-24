import {
  getActorContext,
  getActorState,
  LoginMechanism,
  SignUpContext,
  translate,
} from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { PasswordField, PhoneNumberField, Text, TextField } from '../../..';
import { UserNameAlias as UserNameAliasComponent } from '../shared';
import { propsCreator, phonePropsCreator } from '../../../helpers/utils';

export function FormFields() {
  const { _state, updateForm, updateBlur } = useAuthenticator();
  const { country_code, validationError } = getActorContext(
    _state
  ) as SignUpContext;
  const { loginMechanisms, signUpAttributes } = _state.context.config;

  const fieldNames = Array.from(
    new Set([...loginMechanisms, ...signUpAttributes])
  );

  const formOverrides = getActorState(_state).context?.formFields?.signUp;

  // Only 1 is supported, so `['email', 'phone_number']` will only show `email`
  const loginMechanism = fieldNames.shift() as LoginMechanism;

  const userOR = formOverrides?.[loginMechanism];

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    updateBlur({ name });
  };

  return (
    <>
      <UserNameAliasComponent
        alias={loginMechanism}
        labelHidden={userOR?.labelHidden}
        placeholder={userOR?.placeholder}
        required={userOR?.required}
        label={userOR?.label}
        dialCode={userOR?.dialCode}
        dialCodeList={userOR?.dialCodeList}
        data-amplify-usernamealias
      />

      <PasswordField
        autoComplete="new-password"
        data-amplify-password
        {...propsCreator('password', 'Password', formOverrides, true)}
        hasError={!!validationError['confirm_password']}
        name="password"
        onBlur={handleBlur}
      />

      <PasswordField
        autoComplete="new-password"
        data-amplify-confirmpassword
        {...propsCreator(
          'confirm_password',
          'Confirm Password',
          formOverrides,
          true
        )}
        hasError={!!validationError['confirm_password']}
        name="confirm_password"
        onBlur={handleBlur}
      />

      {validationError['confirm_password'] && (
        <Text role="alert" variation="error">
          {translate(validationError['confirm_password'])}
        </Text>
      )}

      {fieldNames.flatMap((name) => {
        // See: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-custom-attributes
        switch (name) {
          case 'birthdate':
            return (
              <TextField
                {...propsCreator('birthdate', 'Birthdate', formOverrides)}
                autoComplete="bday"
                key={name}
                name={name}
                type="date"
              />
            );

          case 'email':
            return (
              <TextField
                {...propsCreator('email', 'Email', formOverrides)}
                autoComplete="email"
                key={name}
                name={name}
                type="email"
              />
            );

          case 'family_name':
            return (
              <TextField
                autoComplete="family-name"
                {...propsCreator('family_name', 'Family Name', formOverrides)}
                key={name}
                name={name}
              />
            );

          case 'given_name':
            return (
              <TextField
                autoComplete="given-name"
                {...propsCreator('given_name', 'Given Name', formOverrides)}
                key={name}
                name={name}
              />
            );

          case 'middle_name':
            return (
              <TextField
                autoComplete="additional-name"
                {...propsCreator('middle_namme', 'Middle Name', formOverrides)}
                key={name}
                name={name}
              />
            );

          case 'name':
            return (
              <TextField
                autoComplete="name"
                {...propsCreator('name', 'Name', formOverrides)}
                key={name}
                name={name}
              />
            );

          case 'nickname':
            return (
              <TextField
                {...propsCreator('nickname', 'Nickname', formOverrides)}
                key={name}
                name={name}
              />
            );

          case 'phone_number':
            return (
              <PhoneNumberField
                autoComplete="tel"
                {...phonePropsCreator(
                  'phone_number',
                  'Phone Number',
                  formOverrides,
                  country_code
                )}
                countryCodeName="country_code"
                key={name}
                name={name}
              />
            );

          case 'preferred_username':
            return (
              <TextField
                {...propsCreator(
                  'preferred_username',
                  'Preferred Username',
                  formOverrides
                )}
                key={name}
                name={name}
              />
            );

          case 'profile':
            return (
              <TextField
                autoComplete="url"
                {...propsCreator('profile', 'Profile', formOverrides)}
                key={name}
                name={name}
                type="url"
              />
            );

          case 'website':
            return (
              <TextField
                autoComplete="url"
                {...propsCreator('website', 'Website', formOverrides)}
                key={name}
                name="website"
                type="url"
              />
            );

          case 'address':
          case 'gender':
          case 'locale':
          case 'picture':
          case 'updated_at':
          case 'zoneinfo':
          default:
            // There's a `custom:*` attribute or one we don't already have an implementation for
            console.debug(
              `Authenticator does not have a default implementation for ${name}. Customize Authenticator.SignUp.FormFields to add your own.`
            );
        }
      })}
    </>
  );
}
