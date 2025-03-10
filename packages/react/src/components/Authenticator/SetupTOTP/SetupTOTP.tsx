import QRCode from 'qrcode';
import * as React from 'react';

import { Auth, Logger } from 'aws-amplify';
import { getActorState, SignInState, translate } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { Flex, Heading } from '../../..';
import {
  isInputOrSelectElement,
  isInputElement,
  getFormDataFromEvent,
} from '../../../helpers/utils';

import {
  ConfirmationCodeInput,
  ConfirmSignInFooter,
  RemoteErrorMessage,
} from '../shared';
import { useCustomComponents } from '../hooks/useCustomComponents';

const logger = new Logger('SetupTOTP-logger');

export const SetupTOTP = (): JSX.Element => {
  const {
    components: {
      SetupTOTP: { Header = SetupTOTP.Header, Footer = SetupTOTP.Footer },
    },
  } = useCustomComponents();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [qrCode, setQrCode] = React.useState<string>();
  const [copyTextLabel, setCopyTextLabel] = React.useState<string>('COPY');
  const [secretKey, setSecretKey] = React.useState<string>('');
  const { _state, submitForm, updateForm, isPending } = useAuthenticator();

  // `user` hasn't been set on the top-level state yet, so it's only available from the signIn actor
  const actorState = getActorState(_state) as SignInState;
  const { user } = actorState.context;

  const generateQRCode = async (user): Promise<void> => {
    try {
      const newSecretKey = await Auth.setupTOTP(user);
      setSecretKey(newSecretKey);
      const issuer = 'AWSCognito';
      const totpCode = `otpauth://totp/${issuer}:${user.username}?secret=${newSecretKey}&issuer=${issuer}`;
      const qrCodeImageSource = await QRCode.toDataURL(totpCode);

      setQrCode(qrCodeImageSource);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!user) return;

    generateQRCode(user);
  }, [user]);

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    if (isInputOrSelectElement(event.target)) {
      let { name, type, value } = event.target;
      if (
        isInputElement(event.target) &&
        type === 'checkbox' &&
        !event.target.checked
      ) {
        value = undefined;
      }

      updateForm({ name, value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm(getFormDataFromEvent(event));
  };

  const copyText = (): void => {
    navigator.clipboard.writeText(secretKey);
    setCopyTextLabel(translate('COPIED'));
  };

  return (
    <form
      data-amplify-form=""
      data-amplify-authenticator-setup-totp=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Header />

        <Flex direction="column">
          {/* TODO: Add spinner here instead of loading text... */}
          {isLoading ? (
            <p>{translate('Loading')}&hellip;</p>
          ) : (
            <img
              data-amplify-qrcode
              src={qrCode}
              alt="qr code"
              width="228"
              height="228"
            />
          )}
          <Flex data-amplify-copy>
            <div>{secretKey}</div>
            <Flex data-amplify-copy-svg onClick={copyText}>
              <div data-amplify-copy-tooltip>{copyTextLabel}</div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM15 5H8C6.9 5 6.01 5.9 6.01 7L6 21C6 22.1 6.89 23 7.99 23H19C20.1 23 21 22.1 21 21V11L15 5ZM8 21V7H14V12H19V21H8Z"
                  fill="black"
                />
              </svg>
            </Flex>
          </Flex>
          <ConfirmationCodeInput />
          <RemoteErrorMessage />
        </Flex>

        <ConfirmSignInFooter />
        <Footer />
      </fieldset>
    </form>
  );
};

SetupTOTP.Header = () => {
  return <Heading level={3}>{translate('Setup TOTP')}</Heading>;
};

SetupTOTP.Footer = (): JSX.Element => null;
