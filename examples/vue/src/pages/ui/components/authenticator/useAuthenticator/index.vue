<script setup lang="ts">
import { toRefs } from 'vue';
import Amplify from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const { route, user, signOut } = toRefs(useAuthenticator());
const props = useAuthenticator();
</script>

<template>
  <authenticator> </authenticator>
  <template v-if="route === 'authenticated'">
    <h1>Hello {{ user?.username }}!</h1>
    <button @click="signOut">Sign out</button>
  </template>
</template>
