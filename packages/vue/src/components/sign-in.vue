<script setup lang="ts">
import { computed, ComputedRef, useAttrs } from 'vue';
import { createSharedComposable } from '@vueuse/core';

import {
  getActorState,
  getFormDataFromEvent,
  hasTranslation,
  SignInState,
  translate,
} from '@aws-amplify/ui';

import PasswordControl from './password-control.vue';
import UserNameAlias from './user-name-alias.vue';
import FederatedSignIn from './federated-sign-in.vue';

// @xstate
import { useAuth, useAuthenticator } from '../composables/useAuth';

const useAuthShared = createSharedComposable(useAuthenticator);
const props = useAuthShared();

const attrs = useAttrs();
const emit = defineEmits([
  'signInSubmit',
  'forgotPasswordClicked',
  'createAccountClicked',
]);

const passwordLabel = computed(() => translate('Password'));
const forgotYourPasswordLink = computed(() =>
  // Support backwards compatibility for legacy key with trailing space
  !hasTranslation('Forgot your password? ')
    ? translate('Forgot your password?')
    : translate('Forgot your password? ')
);

const signInButtonText = computed(() => translate('Sign in'));
const signIngButtonText = computed(() => translate('Signing in'));

const { state, send } = useAuth();
const actorState = computed(() =>
  getActorState(state.value)
) as ComputedRef<SignInState>;

// Methods

const onInput = (e: Event): void => {
  const { name, value } = <HTMLInputElement>e.target;
  send({
    type: 'CHANGE',
    //@ts-ignore
    data: { name, value },
  });
};

const onSignInSubmit = (e: Event): void => {
  if (attrs?.onSignInSubmit) {
    emit('signInSubmit', e);
  } else {
    submit(e);
  }
};

const submit = (e: Event): void => {
  props.submitForm(getFormDataFromEvent(e));
};

const onForgotPasswordClicked = (): void => {
  if (attrs?.onForgotPasswordClicked) {
    emit('forgotPasswordClicked');
  } else {
    send({ type: 'RESET_PASSWORD' });
  }
};
</script>

<template>
  <slot v-bind="$attrs" name="signInSlotI">
    <slot name="header"></slot>

    <base-wrapper v-bind="$attrs">
      <base-form
        data-amplify-authenticator-signin
        @input="onInput"
        @submit.prevent="onSignInSubmit"
        method="post"
      >
        <template #formt="{ slotData }">
          <slot
            name="form"
            :info="slotData"
            :onSignInSubmit="onSignInSubmit"
            :onInput="onInput"
            :onForgotPasswordClicked="onForgotPasswordClicked"
          >
          </slot>
        </template>
        <federated-sign-in></federated-sign-in>
        <base-wrapper class="amplify-flex" style="flex-direction: column">
          <base-field-set
            :disabled="actorState.matches('signIn.submit')"
            class="amplify-flex"
            style="flex-direction: column"
          >
            <template #fieldSetI="{ slotData }">
              <slot name="signin-fields" :info="slotData"> </slot>
            </template>

            <user-name-alias :userNameAlias="true" />
            <base-wrapper
              class="
                amplify-flex
                amplify-field
                amplify-textfield
                amplify-passwordfield
                password-field
              "
              style="flex-direction: column"
            >
              <password-control
                name="password"
                :label="passwordLabel"
                autocomplete="current-password"
                :ariainvalid="false"
              />
            </base-wrapper>
          </base-field-set>
          <base-alert v-if="actorState.context.remoteError">
            {{ translate(actorState.context.remoteError) }}
          </base-alert>

          <amplify-button
            :disabled="actorState.matches('signIn.submit')"
            class="amplify-field-group__control"
            :fullwidth="true"
            data-loading="false"
            :variation="'primary'"
            style="border-radius: 0x; font-weight: normal"
          >
            {{
              actorState.matches('signIn.submit')
                ? signIngButtonText
                : signInButtonText
            }}
          </amplify-button>
        </base-wrapper>
      </base-form>
    </base-wrapper>

    <base-footer>
      <slot name="footer">
        <div data-amplify-footer>
          <amplify-button
            @click="onForgotPasswordClicked"
            class="amplify-field-group__control"
            data-fullwidth="true"
            data-size="small"
            data-variation="link"
            style="font-weight: normal"
            type="button"
          >
            {{ forgotYourPasswordLink }}
          </amplify-button>
        </div>
      </slot>
    </base-footer>
  </slot>
</template>
